import React from 'react'
import { blogCategories } from '../../../js/categories'

const Categories = () => {
  return (
    <div 
      className='flex gap-[1rem] bg-stone-50 rounded-xl flex-wrap drop-shadow-md
       justify-between p-[0.5rem] px-[0.5rem] sm:px-[2.5rem] border border-zinc-200'
    >
      {
        blogCategories.map((item, index) => (
          <h3 
            className='
            text-lg font-medium cursor-pointer min-w-[100px] text-center max-sm:w-[calc(50%-0.5rem)]
            hover:underline p-[0.25rem] rounded-xl hover:bg-emerald-400 max-sm:border max-sm:border-gray-300'
            key={index}
          >
            {item}
          </h3>
        ))
      }
    </div>
  )
}

export default Categories