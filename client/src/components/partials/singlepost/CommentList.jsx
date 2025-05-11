import { useQuery } from '@tanstack/react-query'
import Comment from './Comment'
import axios from 'axios'
import { useUser } from '@clerk/clerk-react'

const fetchComments = async (postId) => {
    const apiUrl = `${import.meta.env.VITE_API_URL}/comments/${postId}`
    const res = await axios.get(apiUrl)
    return res.data
  }

const CommentList = ({postId, mutation}) => {
    const {user} = useUser()

    const { isPending, error, data } = 
        useQuery({ queryKey: ['comments', postId], queryFn: () => fetchComments(postId) })

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
                            createdAt: new Date.now(),
                            author: {
                                avatar: user.imageUrl,
                                username: user.username
                            }
                        }
                    }/>
                )
            }
            {
                data?.comments && data.comments.map((item,index) => (
                    <Comment data={item} key={index} />
                ))
            }
        </div>
    )
}

export default CommentList