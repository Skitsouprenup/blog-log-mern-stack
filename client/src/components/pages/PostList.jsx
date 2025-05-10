import {useState} from 'react'
import SideMenu from '../partials/postlist/SideMenu'
import { useInfiniteQuery } from '@tanstack/react-query'
import axios from 'axios'
import PostEntry from '../partials/PostEntry'

import InfiniteScroll from 'react-infinite-scroll-component';

const fetchPosts = async (pageParam) => {
  const apiUrl = `${import.meta.env.VITE_API_URL}/posts`
  const res = await axios.get(apiUrl, {
    params: {page: pageParam, limit: 5}
  })
  return res.data
}

const PostList = () => {
  const [open, setOpen] = useState(false)

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: ({pageParam}) => fetchPosts(pageParam),
    initialPageParam: 1,
    //'lastPage' contains the return value of the function in 'queryFn'
    //'pages' stores the number of queried pages in the database.
    getNextPageParam: (lastPage, pages) => {
      //set next page if there are more pages. Otherwise, stop.
      //this condition determines the value of 'fetchNextPage'
      return lastPage.morePages ? pages.length+1 : undefined
    },
  })

  if(status === 'loading') {
    return <div>Loading...</div>
  }

  if(error) {
    return <div>Error fetching data...</div>
  }

  // Uncomment this, open the inpector and reload the page
  // and watch the pages increment in this object
  //console.log(data)

  //Create a new array with 1 level with only posts
  const allPosts = data?.pages.flatMap((page) => page.posts) || []

  return (
    <div 
      className='py-[1.5rem] h-screen'
    >

      <div 
        className='bg-neutral-200 w-[100%] 
        flex justify-center px-[0.5rem]'
      >
        <div className='flex flex-col gap-y-[1.5rem] max-lg:gap-y-[1rem] w-full px-[2rem] max-md:px-[1rem]'>

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

          <div className='flex gap-x-[1.5rem] max-lg:flex-col-reverse lg:justify-between'>
            <InfiniteScroll
              className='flex flex-col gap-y-[1.5rem]'
              dataLength={allPosts.length} //This is important field to render the next data
              next={fetchNextPage}//execute queryFn with new page params
              hasMore={hasNextPage}
              loader={<h4>Loading...</h4>}
              endMessage={
                <p className='py-[1rem]'>
                  <b>There's no post to be seen.</b>
                </p>
              }
            >
              {
                allPosts.map((item) => (
                  <PostEntry key={item?._id} data={item} />
                ))
              }
            </InfiniteScroll>
            
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