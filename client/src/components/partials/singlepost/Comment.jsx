import React from 'react'

import {format} from 'timeago.js'

const Comment = ({data}) => {
  return (
    <div className='flex flex-col gap-y-[1rem] bg-stone-50 rounded-xl p-[1rem] drop-shadow-sm'>
      <div className='flex gap-x-[0.5rem] items-center'>
        <img src={data?.author.avatar} className='w-[48px] rounded-full'/>
        <p>{data?.author.username}</p>
        <p className='text-gray-600'>{format(data?.createdAt)}</p>
      </div>

      <div>
        {data?.content}
      </div>
    </div>
  )
}

export default Comment