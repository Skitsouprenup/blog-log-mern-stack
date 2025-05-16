import { Link } from 'react-router'
import { blogCategories } from '../../../js/categories'

const Categories = () => {
  return (
    <div 
      className='flex gap-[1rem] bg-stone-50 rounded-xl flex-wrap drop-shadow-md sm:px-[2.5rem] border border-zinc-200
      justify-center md:justify-between p-[0.5rem] px-[0.5rem]'
    >
      {
        blogCategories.map((item, index) => (
          <Link to={item.path} key={index}>
            <button 
              className='
              text-lg font-medium cursor-pointer min-w-[100px] text-center max-md:w-[18%]
              hover:underline p-[0.25rem] rounded-xl hover:bg-emerald-400 max-sm:border max-sm:border-gray-300'
            >
              {item.name}
            </button>
          </Link>
        ))
      }
    </div>
  )
}

export default Categories