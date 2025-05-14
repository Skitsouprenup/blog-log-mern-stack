import React from 'react'

const SubFeatured = ({data}) => {

    /*Note: line-clamp has limited browser support */
    return (
        <div className='flex flex-col gap-y-[0.5rem] max-lg:gap-y-[1rem]'>
            <div className='flex gap-x-[0.5rem]'>
                <div>
                    <div><img src={testImg} alt="image" className='max-sm:max-w-[150px] sm:max-w-[200px] rounded-lg'/></div>
                </div>

                <div className='flex flex-col gap-y-[0.5rem] max-sm:line-clamp-4'>
                    <div
                        className='flex gap-x-[0.5rem] items-center max-sm:pb-[0.5rem]'
                    >
                        <div
                            className='flex gap-x-[0.5rem] sm:flex-col'
                        >
                            <p className='leading-[140%] max-sm:text-[0.8rem]'>
                                <span className='max-sm:hidden'>Author:&nbsp;&nbsp;</span>
                                <span className='text-blue-400'>John Doe</span>
                            </p>
                            <p className='leading-[140%] max-sm:text-[0.8rem]'>
                                <span className='text-blue-400'>Software&nbsp;&nbsp;</span>
                                <span className='text-gray-600 max-sm:hidden'>2 Days Ago</span>
                            </p>
                        </div>
                    </div>
                    <div 
                        className='sm:text-xl font-semibold max-sm:text-[0.8rem]'
                    >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris a viverra neque.
                    </div>
                </div>
            </div>
        </div>
  )
}

export default SubFeatured