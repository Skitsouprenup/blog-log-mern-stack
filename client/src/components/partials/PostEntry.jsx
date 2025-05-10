import React from 'react'
import ImgKitImage from '../utils/ImgKitImage.jsx'

import { Link } from 'react-router'
import {trim_text} from '../../js/utils.js'
import {format} from 'timeago.js'

const PostEntry = ({data}) => {

    const linkStyles = 'cursor-pointer w-[fit-content] text-sm font-medium'+
                    ' text-sky-700 hover:underline hover:text-amber-700'

    return (
        <div className='flex gap-x-[0.5rem] '>
            <div>
                <div className='rounded-lg w-full h-full overflow-hidden'>
                    <ImgKitImage 
                        src={data?.image} 
                        className='max-sm:max-w-[150px] sm:max-w-[200px] object-cover rounded-lg'
                        width='200px'
                    />
                </div>
            </div>

            <div className='flex flex-col gap-y-[0.5rem] max-sm:line-clamp-4'>
                <div
                    className='flex gap-x-[0.5rem] items-center max-sm:pb-[0.5rem]'
                >
                    <div
                        className='flex gap-x-[0.5rem] sm:flex-col'
                    >
                        <button type='button' className='leading-[140%] max-sm:text-[0.8rem] flex'>
                            <p className='max-sm:hidden'>Author:&nbsp;&nbsp;</p>
                            <span 
                                className={linkStyles}
                            >
                                <Link>{data?.author?.username}</Link>
                            </span>
                        </button>
                        <button type='button' className='leading-[140%] max-sm:text-[0.8rem] flex'>
                            <span 
                                className={linkStyles}
                            >
                                <Link>
                                    {data?.category}
                                </Link>
                            </span>&nbsp;&nbsp;
                            <p className='text-gray-600 max-sm:hidden'>{format(data?.createdAt)}</p>
                        </button>
                    </div>
                </div>
                <div 
                    className='sm:text-lg lg:text-xl font-semibold max-sm:text-[0.8rem]'
                >
                    {data?.title}
                </div>
                <p 
                    className='text-sm font-medium text-gray-700 overflow-y-hidden'
                >
                    {trim_text(data?.desc, 200, 150)}
                </p>
                <button type="button" className={linkStyles}>
                    <Link to={`/${data?._id}/${data?.slug}`}>
                        Read More
                    </Link>
                </button>
            </div>
        </div>
    )
}

export default PostEntry