import React from 'react'
import Actions from '../partials/singlepost/Actions'
import Search from '../partials/Search'
import CommentContainer from '../partials/singlepost/CommentContainer'
import AuthorInfo from '../partials/singlepost/AuthorInfo'

import { Link, useNavigate, useParams } from 'react-router'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import PostSubInfo from '../partials/PostSubInfo'

import ImgKitImage from '../utils/ImgKitImage'
import { useAuth, useUser } from '@clerk/clerk-react'

const fetchPost = async (postId, slug) => {
  const apiUrl = `${import.meta.env.VITE_API_URL}/posts/${postId}/${slug}`
  const res = await axios.get(apiUrl)
  return res.data
}

const SinglePost = () => {
  const {user} = useUser()
  const {getToken} = useAuth()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const {slug, id} = useParams()

  const { isPending, error, data } = 
    //revalidate query cache if id or slug in queryKey changes
    useQuery({ queryKey: ['post',id,slug], queryFn: () => fetchPost(id, slug) })

    if(isPending) {
      return <div>Loading...</div>
    }
  
    if(error) {
      return <div>Error fetching data...</div>
    }

  return (
    <div className='flex flex-col gap-y-[2.5rem] px-[1rem] lg:px-[4rem] w-[100%] py-[1.5rem] items-center'>
      <div className='flex flex-col gap-y-[0.25rem] w-[100%]'>
        <button type='button'
          className='text-xl font-semibold flex hover:underline'
        >
          <Link>
            {data?.title}
          </Link>
        </button>

        {data?.desc && <p className='text-sm'>{data?.desc}</p>}
        <PostSubInfo 
          data={data} 
          containerClassName='flex gap-x-[0.5rem] items-center'
        />
      </div>

      <div className='flex gap-x-[1.5rem]'>

        <div className='flex flex-col gap-y-[0.5rem]'>
          <div className='flex justify-center w-[100%]'>
            <ImgKitImage width="640px" src={data?.image} className='rounded-xl object-cover'/>
          </div>

          <div className='text-justify'>
            Duis posuere dui id enim varius, nec iaculis quam feugiat. Vestibulum leo nulla, porta et odio in, vehicula convallis nulla. In suscipit eu libero pellentesque fringilla. Vivamus fringilla, erat sed suscipit faucibus, eros nisi bibendum neque, ut commodo purus enim vitae nibh. Donec mollis scelerisque sem ut sollicitudin. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eleifend vitae ipsum quis finibus. Quisque at sagittis lectus. Proin quis justo pretium diam luctus sagittis sit amet pellentesque nulla. Curabitur eros purus, bibendum sed lorem non, sodales mattis arcu. Donec elementum justo non dui tempus tempus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.

            Cras laoreet in nisl vitae euismod. Cras pharetra consectetur tristique. Aenean sit amet eros ac tellus blandit convallis. Ut ultrices tincidunt eleifend. Proin eget tincidunt neque. Donec porta, felis et egestas lacinia, augue nulla ullamcorper justo, non luctus lorem erat at tellus. Sed et lacus vel libero sodales congue vel sed massa. Quisque consequat est turpis, ut sollicitudin urna suscipit et. Vivamus id laoreet felis, sit amet condimentum erat. Nam vehicula nulla vitae odio mollis, vitae porta orci tempor. Nulla sed nisl commodo, consectetur dolor in, elementum ligula. 
          </div>

          {/* Comment List */}
          <CommentContainer postId={data?._id} queryClient={queryClient} getToken={getToken}/>
        </div>

        {/* Sidebar */}
        <div className='flex flex-col gap-y-[1rem] top-0 h-max sticky max-lg:hidden'>

          {/* Author Info */}
          <AuthorInfo data={data?.author}/>

          {/* Actions */}
          <Actions postId={id} 
            author={data?.author} navigate={navigate}
            queryClient={queryClient} getToken={getToken}
            user={user}
          />

          {/* Search Box */}
          <Search placeholder='Search for posts...' moveTo='/posts'/>
        </div>
      </div>

    </div>
  )
}

export default SinglePost