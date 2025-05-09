import React from 'react'
import testImg from '../../assets/test_img.jpg'
import Actions from '../partials/singlepost/Actions'
import Search from '../partials/Search'
import CommentList from '../partials/singlepost/CommentList'
import AuthorInfo from '../partials/singlepost/AuthorInfo'

const SinglePost = () => {
  return (
    <div className='flex flex-col gap-y-[2.5rem] px-[1rem] lg:px-[4rem] w-[100%] py-[1.5rem] items-center'>
      <div className='flex flex-col gap-y-[0.25rem] w-[100%]'>
        <h1
          className='text-xl font-semibold'
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris a viverra neque.
        </h1>

        <p className='text-sm'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean finibus imperdiet sollicitudin. Etiam nec blandit quam.
        </p>
      </div>

      <div className='flex gap-x-[1.5rem]'>

        <div className='flex flex-col gap-y-[0.5rem]'>
          <div className='flex justify-center w-[100%]'><img src={testImg} alt="image" className='rounded-xl object-cover'/></div>

          <div className='text-justify'>
            Duis posuere dui id enim varius, nec iaculis quam feugiat. Vestibulum leo nulla, porta et odio in, vehicula convallis nulla. In suscipit eu libero pellentesque fringilla. Vivamus fringilla, erat sed suscipit faucibus, eros nisi bibendum neque, ut commodo purus enim vitae nibh. Donec mollis scelerisque sem ut sollicitudin. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eleifend vitae ipsum quis finibus. Quisque at sagittis lectus. Proin quis justo pretium diam luctus sagittis sit amet pellentesque nulla. Curabitur eros purus, bibendum sed lorem non, sodales mattis arcu. Donec elementum justo non dui tempus tempus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.

            Cras laoreet in nisl vitae euismod. Cras pharetra consectetur tristique. Aenean sit amet eros ac tellus blandit convallis. Ut ultrices tincidunt eleifend. Proin eget tincidunt neque. Donec porta, felis et egestas lacinia, augue nulla ullamcorper justo, non luctus lorem erat at tellus. Sed et lacus vel libero sodales congue vel sed massa. Quisque consequat est turpis, ut sollicitudin urna suscipit et. Vivamus id laoreet felis, sit amet condimentum erat. Nam vehicula nulla vitae odio mollis, vitae porta orci tempor. Nulla sed nisl commodo, consectetur dolor in, elementum ligula. 
          </div>

          {/* Comment List */}
          <CommentList />
        </div>

        {/* Sidebar */}
        <div className='flex flex-col gap-y-[1rem] top-0 h-max sticky max-lg:hidden'>

          {/* Author Info */}
          <AuthorInfo />

          {/* Actions */}
          <Actions />

          {/* Search Box */}
          <Search placeholder='Search for posts...'/>
        </div>
      </div>

    </div>
  )
}

export default SinglePost