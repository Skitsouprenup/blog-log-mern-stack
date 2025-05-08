import React from 'react'
import {blogCategories} from '../../js/categories'

const CategoryList = () => {

    return (
        <div className='flex flex-col gap-y-[0.75rem]'>
            <h3 className='font-medium'>Categories</h3>
            {
                blogCategories.map((item, index) => (
                    <div 
                        className='flex gap-x-[0.5rem] items-center' 
                        key={index}
                    >
                        <p 
                            className='text-zinc-800 cursor-pointer hover:underline'
                        >
                            {item}
                        </p>
                    </div>
                ))
            }
        </div>
    )
}

export default CategoryList