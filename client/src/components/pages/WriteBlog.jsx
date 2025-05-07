import {useUser} from '@clerk/clerk-react'

import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css'

import { useRef, useEffect } from 'react'

const WriteBlog = () => {
  const {isLoaded, isSignedIn} = useUser()
  const mainDivRef = useRef(null)

  if(!isLoaded) {
    <div>
      <p>Loading...</p>
    </div>
  }

  if(isLoaded && !isSignedIn) {
    <div>
      <p>Login first to write a blog</p>
    </div>
  }

  /*
    Set main div's height to screen height and center its
    content if the div's height is less than the viewport height.
    Otherwise, you will have a blank white space on the bottom
    of your screen because main layout's box with background color 
    takes the size of the main div.

    Note: This is only implemented during initial render due to
    this useEffect. To implement this dynamically, add the changeHeight
    function in 'onchange' event of main div.
  */
  useEffect(() => {

    const changeHeight = () => {
      if(mainDivRef.current !== null) {
        if(mainDivRef.current.style.height === '') {
          const rect = mainDivRef.current.getBoundingClientRect();
          const viewportHeight = window.innerHeight

          if(rect.height < viewportHeight) {
            mainDivRef.current.style.height = '100vh'
            mainDivRef.current.style.justifyContent = 'center'
          }
        }
      }
    }
    changeHeight()
  },[])

  return (
    <div 
      className='flex flex-col gap-y-[1rem] sm:p-[2rem] max-sm:p-[1rem]'
      ref={mainDivRef}
    >
      <h1 className='font-semibold text-xl'>Create Post</h1>
      <form className='flex flex-col gap-y-[1rem]'>

        <button 
          type='button' 
          className='p-[0.5rem] bg-stone-50 rounded-xl cursor-pointer
          w-[fit-content] drop-shadow-sm hover:bg-emerald-300'
        >
          Add Cover Image
        </button>

        <input 
          type='text' 
          placeholder='Title...'
          className='p-[0.5rem] bg-stone-50 rounded-xl w-[fit-content] drop-shadow-sm text-lg'
        />
        <div className='flex gap-x-[0.75rem] items-center'>
          <p className='font-medium'>Choose Category:&nbsp;</p>
          <select
            className='p-[0.5rem] pr-[1rem] bg-stone-50 rounded-xl w-[fit-content] drop-shadow-sm'
          >
            <option value='Software'>Sotfware</option>
            <option value='Travel'>Travel</option>
            <option value='Gaming'>Gaming</option>
            <option value='Gaming'>Art</option>
          </select>
        </div>
        <div 
          className='flex gap-[0.75rem] p-[0.5rem] bg-stone-50 rounded-xl 
          w-[100%] drop-shadow-md items-center'
        >
          <textarea
            rows='2'
            className='resize-none flex-1 text-lg outline-none rounded-lg p-[0.25rem]'
            placeholder='Short Description...'
          ></textarea>
        </div>

        <ReactQuill theme="snow" className='bg-stone-50 h-[100%] rounded-lg' />

        <button 
          type='button' 
          className='p-[0.5rem] rounded-xl cursor-pointer
          w-[fit-content] drop-shadow-sm bg-green-500 hover:bg-emerald-400'
        >
          Create Post
        </button>
      </form>
    </div>
  )
}

export default WriteBlog