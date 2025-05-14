import { useSearchParams } from "react-router"
import { firstLetterCapital } from "../../../js/utils"

const Filters = () => {
    const[searchParams, setSearchParams] = useSearchParams()

    const filters = [
        'newest',
        'oldest',
        'popular', 
        'trending'
    ]

    const handleFilter = (e) => {
        if(searchParams.get('sort') === e.target.value) return

        const urlQueries = Object.fromEntries([...searchParams])
        setSearchParams({...urlQueries, sort:e.target.value})
    }

    return (
        <div className='flex flex-col gap-y-[0.75rem]'>
            <h3 className='font-medium'>Filters</h3>
            {
                filters.map((item, index) => (
                    <div className='flex gap-x-[0.5rem] items-center' key={index}>
                        <input 
                            type='radio' 
                            className='w-[24px] h-[24px] border'
                            name="sort"
                            onChange={handleFilter}
                            value={item}
                        />
                        <p className='text-zinc-800'>{firstLetterCapital(item)}</p>
                    </div>
                ))
            }
        </div>
    )
}

export default Filters