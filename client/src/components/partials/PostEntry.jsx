import React from 'react'
import ImgKitImage from '../utils/ImgKitImage.jsx'

import { Link } from 'react-router'
import {trim_text} from '../../js/utils.js'
import PostSubInfo from './PostSubInfo.jsx'

const linkStyles = 'cursor-pointer w-[fit-content] text-sm font-medium'+
                    ' text-sky-700 hover:underline hover:text-amber-700'

const PostEntry = ({data}) => {

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
                <PostSubInfo data={data} containerClassName='flex gap-x-[0.5rem] sm:flex-col' />

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