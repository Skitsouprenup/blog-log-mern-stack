import Search from '../Search'
import Filters from './Filters'
import CategoryList from '../CategoryList'

const SideMenu = () => {
  return (
    <>
      <Search placeholder='Search for posts...'/>
      <div className='flex max-lg:flex-row lg:flex-col lg:gap-y-[2rem] max-lg:gap-x-[2rem]'>
        <Filters />
        <CategoryList />
      </div>
    </>
  )
}

export default SideMenu