import React from 'react'
import Comment from './Comment'

const CommentList = () => {
  return (
    <div className='flex flex-col gap-y-[0.75rem] pt-[2rem]'>
      <h3 className='font-medium text-lg'>Comments</h3>

      <div 
        className='flex gap-[0.75rem] p-[0.5rem] bg-stone-50 rounded-xl 
        w-[100%] drop-shadow-md items-center'
      >
        <textarea
          rows='2'
          className='resize-none flex-1 text-xl outline-none border border-zinc-300 rounded-lg p-[0.25rem]'
        ></textarea>

        <button 
          type='button' 
          className='p-[0.75rem] bg-amber-500 cursor-pointer
          hover:bg-amber-400 h-[fit-content] rounded-lg'
        >
          Comment
        </button>
      </div>

      <div className='flex flex-col gap-y-[1.25rem] py-[1.25rem]'>
        <Comment />
        <Comment />
      </div>
    </div>
  )
}

export default CommentList