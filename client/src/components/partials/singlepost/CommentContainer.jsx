import { useRef, useState } from 'react'
import CommentList from './CommentList'
import { useMutation } from '@tanstack/react-query'
import FormError from '../../utils/FormError'
import axios from 'axios'

const CommentContainer = ({postId, queryClient, getToken, user}) => {
  const commentRef = useRef(null)

  const [formError, setFormError] = useState('')

  const mutation = useMutation({
    //This is executed when mutate() function is called
    //by this mutation variable
    mutationFn: async (newComment) => {
      //console.log(newComment)
      const token = await getToken()
      return axios.post(`${import.meta.env.VITE_API_URL}/comments/${postId}`, newComment, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    },
    onSuccess: () => {
      if(commentRef?.current) commentRef.current.value = ''
      //refresh comment cache in CommentList.jsx
      queryClient.invalidateQueries({queryKey: ['comments', postId]})
    },
    onError: (error) => {
      setFormError(error.message)
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)

    const data = {
      content: formData.get('content'),
      post: postId
    }

    mutation.mutate(data)
  }

  return (
    <div className='flex flex-col gap-y-[0.75rem] pt-[2rem] w-[100%]'>
      <h3 className='font-medium text-lg'>Comments</h3>

      <form 
        onSubmit={handleSubmit}
        className='flex gap-[0.75rem] p-[0.5rem] bg-stone-50 rounded-xl 
         drop-shadow-md items-center'
      >
        <textarea
          ref={commentRef}
          rows='2'
          className='resize-none flex-1 text-xl outline-none border border-zinc-300 rounded-lg p-[0.25rem] w-[100%]'
          name="content"
        ></textarea>

        <button 
          type='submit' 
          className='p-[0.75rem] bg-amber-500 cursor-pointer
          hover:bg-amber-400 h-[fit-content] rounded-lg
          disabled:cursor-not-allowed disabled:bg-gray-600'
          disabled={mutation.isPending}
        >
          {mutation.isPending ? 'Wait...' : 'Comment'}
        </button>
      </form>

      <FormError formError={formError} setFormError={setFormError}/>
      <CommentList 
        postId={postId} 
        mutation={mutation} 
        queryClient={queryClient} 
        getToken={getToken}
        user={user}
      />
    </div>
  )
}

export default CommentContainer