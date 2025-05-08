import { Fragment, useState } from 'react'

const Filters = () => {

    const filters = [
        'Newest',
        'Oldest',
        'Most Popular', 
        'Trending'
    ]

    return (
        <div className='flex flex-col gap-y-[0.75rem]'>
            <h3 className='font-medium'>Filters</h3>
            {
                filters.map((item, index) => (
                    <div className='flex gap-x-[0.5rem] items-center' key={index}>
                        <input 
                            type='radio' 
                            className='w-[24px] h-[24px] border'
                            name="sort"
                            value={item}
                        />
                        <p className='text-zinc-800'>{item}</p>
                    </div>
                ))
            }
        </div>
    )
}

export default Filters