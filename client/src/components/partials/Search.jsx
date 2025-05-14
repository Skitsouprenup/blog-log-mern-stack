import SearchBox from './SearchBox'

const Search = ({placeholder, moveTo=''}) => {
  return (
    <div className='flex flex-col gap-y-[0.5rem]'>
        <h3 className='font-medium'>Search</h3>
        <SearchBox placeholder={placeholder} moveTo={moveTo}/>
    </div>
  )
}

export default Search