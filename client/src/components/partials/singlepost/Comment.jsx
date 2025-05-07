import React from 'react'
import testAvatar from '../../../assets/test_avatar.jpg'

const Comment = () => {
  return (
    <div className='flex flex-col gap-y-[1rem] bg-stone-50 rounded-xl p-[1rem] drop-shadow-sm'>
      <div className='flex gap-x-[0.5rem] items-center'>
        <img src={testAvatar} className='w-[48px] rounded-full'/>
        <p>John Doe</p>
        <p className='text-gray-600'>2 days ago</p>
      </div>

      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dui orci, fringilla quis ultricies vitae, 
        sollicitudin id diam. Quisque nulla eros, hendrerit id lectus et, hendrerit vulputate libero.
      </div>
    </div>
  )
}

export default Comment