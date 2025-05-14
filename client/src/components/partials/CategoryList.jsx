import { useSearchParams } from 'react-router'
import {blogCategories} from '../../js/categories'

const CategoryList = () => {
    const [searchParams, setSearchParams] = useSearchParams()

    const selectCategory = (category) => {
        if(searchParams.get('category') === category) return
        
        if(category !== 'All') {
                setSearchParams(
                {
                    ...Object.fromEntries(searchParams.entries()), 
                    category
                }
            )
        } else setSearchParams({})
    }

    return (
        <div className='flex flex-col gap-y-[0.75rem]'>
            <h3 className='font-medium'>Categories</h3>
            {
                blogCategories.map((item, index) => (
                    <div 
                        className='flex gap-x-[0.5rem] items-center' 
                        key={index}
                    >
                        <button 
                            type='button'
                            className='text-zinc-800 cursor-pointer hover:underline'
                            onClick={() => selectCategory(item.name)}
                        >
                            {item.name}
                        </button>
                    </div>
                ))
            }
        </div>
    )
}

export default CategoryList