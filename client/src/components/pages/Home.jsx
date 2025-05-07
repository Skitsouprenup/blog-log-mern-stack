import React from 'react'
import { Link } from 'react-router'
import Categories from '../partials/home/Categories'
import FeaturedPosts from '../partials/home/FeaturedPosts'
import RecentPosts from '../partials/home/RecentPosts'
import SearchBox from '../partials/SearchBox'

const Home = () => {
  return (
    <div className='flex flex-col gap-y-[1rem] p-[1.5rem]'>
      <div className='flex gap-x-[0.5rem] justify-between items-center'>
        <div className='flex flex-col gap-y-[1rem]'>
          <h1 className='text-[2rem] sm:text-[2.25rem] font-bold'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras convallis, 
            turpis a vestibulum fringilla, est elit efficitur turpis, eu sollicitudin 
            est metus feugiat lacus.
          </h1>

          <h2 className='text-sm'>
            Donec sit amet pharetra ipsum, vitae mattis neque. Donec venenatis tincidunt velit eu maximus. 
            Nam metus magna, tincidunt non faucibus ultricies, lacinia vitae urna. Donec eu purus mollis, pharetra
            ipsum et, volutpat lorem.</h2>
        </div>

        <div className='hidden md:flex relative h-[fit-content]'>
          <div className='overflow-hidden'>
            <svg
              viewBox='0 0 200 200'
              width='200'
              height='200'
              className='text-lg animate-spin tracking-wider spinning_text_speed'
            >
              <path 
                id="circlePath"
                fill='none'
                d="M 35,100 a 65 65 0,0,1, 130 0 a 65 65 0,0,1, -130 0"
              />
              {/*<circle r="45" cx="100" cy="100" fill="red" /> */}
              <text>
                <textPath href='#circlePath' startOffset="3%">Write a Blog!</textPath>
                <textPath href='#circlePath' startOffset="50%">Sharing is Caring!</textPath>
              </text>
            </svg>
          </div>

          <div 
            className='p-[1rem] bg-emerald-400 absolute cursor-pointer hover:border hover:border-dashed hover:border-stone-500
            rounded-full top-[calc(100px-1rem-8px)] left-[calc(100px-1rem-8px)] hover:scale-[1.25] transition-transform duration-200'>
            <Link to='/write'>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>
      <SearchBox />
      <Categories />
      <FeaturedPosts />
      <RecentPosts />
    </div>
  )
}

export default Home