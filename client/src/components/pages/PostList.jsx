import {useState} from 'react'
import testImg from '../../assets/test_img.jpg'
import SideMenu from '../partials/postlist/SideMenu'

const PostList = () => {
  const [open, setOpen] = useState(false)

  return (
    <div 
      className='py-[1.5rem] h-screen'
    >

      <div 
        className='bg-neutral-200 w-[100%] 
        flex justify-center px-[0.5rem]'
      >
        <div className='flex flex-col gap-y-[1.5rem] max-lg:gap-y-[1rem]'>

          <div className='flex flex-col gap-y-[1rem] w-[100%]'>
            <h1
              className='text-xl font-semibold'
            >
              Software
            </h1>

            <button 
              type='button' 
              className='p-[0.5rem] bg-emerald-400 w-[fit-content] max-lg:block hidden
              cursor-pointer hover:bg-green-400 border border-zinc-300 rounded-lg'
              onClick={() => setOpen(!open)}
            >
              {open ? 'Close' : 'Options'}
            </button>
          </div>

          <div className='flex gap-x-[1.5rem] max-lg:flex-col-reverse'>
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
                              <span className='text-gray-600 max-sm:hidden'>2 days ago</span>
                          </p>
                      </div>
                  </div>
                  <div 
                      className='sm:text-lg lg:text-xl font-semibold max-sm:text-[0.8rem]'
                  >
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris a viverra neque.
                  </div>
              </div>
            </div>

            {/* Sidebar(Desktop) */}
            <div 
              className='flex flex-col gap-y-[1.5rem] top-0 h-max 
              sticky p-[0.5rem] max-lg:hidden'
            >
              <SideMenu />
            </div>

            <div className={`max-lg:pb-[2rem] lg:hidden flex-col gap-y-[1.5rem] ${open ? 'flex' : 'hidden'}`}>
              <SideMenu />
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default PostList