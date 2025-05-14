import { useLocation, useNavigate, useSearchParams } from "react-router"

const SearchBox = ({placeholder, moveTo=''}) => {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const handleKeyPress = (e) => {
    if(e.key === "Enter") {
      let value = e.target.value
      const title = value.replace(/[^a-zA-Z0-9\-\&;]/g, '').trim()

      let urlQueries = { ...Object.fromEntries(searchParams), title: title}
      if(!title) delete urlQueries['title']

      //If search is in '/posts' page url, retain existing query parameters
      if(location.pathname === "/posts") {
        setSearchParams(urlQueries)
      }

      if(moveTo && title) navigate(moveTo+`?title=${title}`)
    }
  }

  return (
    <div>
        <div className='flex gap-[0.75rem] p-[0.5rem] bg-stone-50 rounded-xl w-[fit-content] drop-shadow-md'>
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                </svg>
            </div>
            <input 
              type='text' 
              className='text-md outline-none' 
              placeholder={placeholder} 
              onKeyDown={handleKeyPress}
            />
        </div>
    </div>
  )
}

export default SearchBox