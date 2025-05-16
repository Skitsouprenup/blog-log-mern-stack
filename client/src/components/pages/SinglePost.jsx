import Actions from '../partials/singlepost/Actions'
import Search from '../partials/Search'
import CommentContainer from '../partials/singlepost/CommentContainer'

import { useNavigate, useParams } from 'react-router'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import PostSubInfo from '../partials/PostSubInfo'

import ImgKitImage from '../utils/ImgKitImage'
import { useAuth, useUser } from '@clerk/clerk-react'
import { useEffect, useState } from 'react'
import EditBlog from './EditBlog'
import SearchBox from '../partials/SearchBox'
import AuthorInfo from '../partials/singlepost/AuthorInfo'

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

    const [editMode, setEditMode] = useState(false)
    const[mobileSidebar, setMobileSidebar] = useState(false)

    const { isPending, error, data, refetch, isRefetching } = 
    //revalidate query cache if id or slug in queryKey changes
    useQuery({ 
      queryKey: ['post',id,slug], 
      queryFn: () => fetchPost(id, slug),
      refetchOnWindowFocus: false,
      refetchOnMount: false
    })

    useEffect(() => {
      if(!isRefetching) {
        setEditMode(false)
      }
    }, [isRefetching])


    if(isPending) {
      return <div>Loading...</div>
    }
  
    if(error) {
      return <div>Error fetching data...</div>
    }

    if(editMode) {
      return <EditBlog 
        data={data} 
        setEditMode={setEditMode} 
        refetch={refetch}
        />
    }

    return (
      <div className='flex flex-col gap-y-[2.5rem] px-[1rem] lg:px-[4rem] w-[100%] items-center '>

        <div className='flex gap-x-[1rem] pt-[1rem] w-[100%]'>
          <div className='flex flex-col gap-y-[0.25rem] flex-1'>
            <p className='text-xl font-semibold flex'>
              {data?.title}
            </p>

            {data?.desc && <p className='text-sm'>{data?.desc}</p>}
            <PostSubInfo 
              data={data} 
              containerClassName='flex gap-x-[0.5rem] items-center'
            />
          </div>

          <div className={`lg:hidden
            ${mobileSidebar ? 'max-lg:fixed left-[calc(100%-60px)] z-10' : 'max-lg:flex'}`}
          >
            <button 
              type='button'
              onClick={() => setMobileSidebar(!mobileSidebar)}
              className='p-[0.5rem] bg-emerald-400 w-[fit-content] h-[fit-content]
              cursor-pointer hover:bg-green-400 border border-zinc-300 rounded-lg'
            >
              {
                !mobileSidebar && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-gear-fill" viewBox="0 0 16 16">
                    <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
                  </svg>
                )
              }
              {
                mobileSidebar && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-x-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
                  </svg>
                )
              }
            </button>
          </div>
        </div>

        <div className='flex gap-x-[1.5rem] pb-[1rem]'>

          <div className='flex flex-col gap-y-[0.5rem]'>
            <div className='flex justify-center w-[100%]'>
              <ImgKitImage width="640px" src={data?.image} className='rounded-xl object-cover'/>
            </div>
            {/*
              Note: using dangerouslySetInnerHTML IS DANGEROUS AND CAN LEAD TO XSS ATTACKS! 
              Make sure the data that you're gonna inject is trusted and properly sanitized 
              especially user-created data. In this project, I don't take extreme measures 
              in security in favor of performance. Read the README.md of this project on 
              its github page to know how to mitigate XSS attack further.
            */}
            <div className='text-justify' dangerouslySetInnerHTML={{__html: data?.content}}>
            </div>

            {/* Comment List */}
            <CommentContainer 
              postId={data?._id} 
              queryClient={queryClient} 
              getToken={getToken}
              user={user}
            />
          </div>

          {/* Sidebar */}
          <div className='flex flex-col gap-y-[1rem] top-0 h-max sticky max-lg:hidden'>

            {/* Author Info */}
            <AuthorInfo data={data?.author}/>

            {/* Actions */}
            <Actions postId={id} 
              author={data?.author} navigate={navigate}
              queryClient={queryClient} getToken={getToken}
              user={user} setEditMode={setEditMode}
            />

            {/* Search Box */}
            <Search placeholder='Search for posts...' moveTo='/posts'/>
          </div>
        </div>

        {/* Sidebar(Mobile) */}
        <div 
            className={`fixed flex flex-col gap-y-[0.5rem] justify-center items-center h-screen w-screen
              border-1 border-double border-gray-400/50 bg-zinc-300
            ${!mobileSidebar ? ' right-[-100%]' : 'right-0'} transition-normal duration-200
            ${mobileSidebar ? 'opacity-100' : 'opacity-0'} hidden max-lg:flex
            `}
        >
          <AuthorInfo data={data?.author}/>
          <Actions postId={id} 
            author={data?.author} navigate={navigate}
            queryClient={queryClient} getToken={getToken}
            user={user} setEditMode={setEditMode}
          />
          <SearchBox placeholder='Search for posts...' moveTo='/posts'/>
        </div>

      </div>
    )
}

export default SinglePost