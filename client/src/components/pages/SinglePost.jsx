import React from 'react'
import testImg from '../../assets/test_img.jpg'
import testAvatar from '../../assets/test_avatar.jpg'
import Actions from '../partials/singlepost/Actions'
import Search from '../partials/Search'
import CommentList from '../partials/singlepost/CommentList'

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
          <div className='flex flex-col gap-y-[0.75rem] pt-[0.5rem]'>
            <h3 className='font-medium'>Author</h3>
            <div className='flex gap-x-[0.5rem] items-center'>
              <img src={testAvatar} className='w-[64px] rounded-full'/>
              <p>John Doe</p>
            </div>
            <p className='text-zinc-600 text-sm'>
              Sed non accumsan nunc. Integer semper sollicitudin dolor, ut vehicula mi elementum a.
            </p>
            <div className='flex gap-x-[1rem]'>
              <button type="button" className='group cursor-pointer'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="group-hover:fill-red-400 bi bi-instagram" viewBox="0 0 16 16">
                  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
                </svg>
              </button>
              <button type='button' className='group cursor-pointer'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="group-hover:fill-red-400 bi bi-twitter-x" viewBox="0 0 16 16">
                  <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/>
                </svg>
              </button>
            </div>
          </div>

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