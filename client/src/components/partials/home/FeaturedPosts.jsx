import React from 'react'
import testImg from '../../../assets/test_img.jpg'

const FeaturedPosts = () => {
  return (
    <div
        className='flex gap-x-[0.5rem] p-[0.5rem] max-lg:flex-col'
    >
        {/*Main Featured Post*/}
        <div className='flex flex-col gap-y-[0.5rem] max-lg:pb-[2rem] max-lg:items-center'>
            <div className='w-[fit-content]'><img src={testImg} alt="image" className='rounded-xl object-cover'/></div>
            <div
                className='flex gap-x-[0.5rem]'
            >
                <div
                    className='flex gap-x-[0.5rem] flex-col'
                >
                    <p className='leading-[140%]'>
                        Author:&nbsp;&nbsp;
                        <span className='text-blue-400'>John Doe</span>
                    </p>
                    <p className='leading-[140%]'>
                        <span className='text-blue-400'>Software&nbsp;&nbsp;</span>
                        <span className='text-gray-600'>2 Days Ago</span>
                    </p>
                </div>
            </div>
            <div 
                className='text-xl font-semibold max-lg:text-center'
            >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris a viverra neque.
            </div>
        </div>

        {/* Sub Featured Post */}
        {/*Note: line-clamp has limited browser support */}
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

    </div>
  )
}

export default FeaturedPosts