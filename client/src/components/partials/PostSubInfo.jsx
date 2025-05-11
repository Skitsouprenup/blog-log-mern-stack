import React from 'react'

import {format} from 'timeago.js'
import { Link } from 'react-router'

const linkStyles = 'cursor-pointer w-[fit-content] text-sm font-medium'+
                    ' text-sky-700 hover:underline hover:text-amber-700 text-[1rem]'

const PostSubInfo = ({data, containerClassName}) => {

    return (
        <div
            className='flex gap-x-[0.5rem] items-center max-sm:pb-[0.5rem]'
        >
            <div
                className={containerClassName}
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
                    <span className='hidden sm:inline'>on&nbsp;</span>
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
    )
}

export default PostSubInfo