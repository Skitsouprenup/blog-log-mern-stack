import { useMutation, useQuery } from '@tanstack/react-query'
import Comment from './Comment'
import axios from 'axios'

const fetchComments = async (postId) => {
    const apiUrl = `${import.meta.env.VITE_API_URL}/comments/${postId}`
    const res = await axios.get(apiUrl)
    return res.data
  }

const CommentList = ({postId, mutation, queryClient, getToken, user}) => {
    const { isPending, error, data } = 
        useQuery({ queryKey: ['comments', postId], queryFn: () => fetchComments(postId) })

    const deleteComment = useMutation({
        mutationFn: async (commentId) => {
            const token = await getToken()
            return axios.delete(`${import.meta.env.VITE_API_URL}/comments/${commentId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['comments', postId]})
        },
        onError: (error) => {
            console.log(error)
        }
    })

    if(isPending) {
        return <div className='text-md font-semibold'>Loading...</div>
    }

    if(error) {
        return <div className='text-md font-semibold'>Error fetching comments...</div>
    }

    if(data?.comments && data.comments.length === 0) {
        return <div className='text-md font-semibold'>This post has no comments...</div>
    }

    return (
        <div className='flex flex-col gap-y-[1.25rem] py-[1.25rem]'>
            {/* 
                Optimistic mutation in react-query. In other words, 
                display the data immediately even if the data is not 
                yet sent to the database.
            */}
            {
                mutation.isPending && (
                    //'variables' is the payload that we put in 'mutationFn'
                    //function
                    <Comment data={
                        {
                            content: `${mutation.variables.content} (Sending...)`,
                            createdAt: Date.now(),
                            author: {
                                avatar: user.imageUrl,
                                username: user.username
                            }
                        }
                    }
                    deleteComment={deleteComment}
                    />
                )
            }
            {
                data?.comments && data.comments.map((item,index) => (
                    <Comment data={item} key={index} deleteComment={deleteComment}/>
                ))
            }
        </div>
    )
}

export default CommentList