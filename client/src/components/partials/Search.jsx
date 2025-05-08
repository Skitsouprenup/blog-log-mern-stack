import React from 'react'
import SearchBox from './SearchBox'


const Search = ({placeholder}) => {
  return (
    <div className='flex flex-col gap-y-[0.5rem]'>
        <h3 className='font-medium'>Search</h3>
        <SearchBox placeholder={placeholder}/>
    </div>
  )
}

export default Search