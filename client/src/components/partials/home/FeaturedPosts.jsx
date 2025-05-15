import axios from "axios"
import MainFeatured from "./featuredposts/MainFeatured"
import SubFeatured from "./featuredposts/SubFeatured"
import { useQuery } from '@tanstack/react-query'

const fetchFeaturedPosts = async () => {
    const apiUrl = `${import.meta.env.VITE_API_URL}/posts/featured`
    const res = await axios.get(apiUrl)
    return res.data
}

const FeaturedPosts = () => {

    const { isPending, error, data } = 
    //revalidate query cache if id or slug in queryKey changes
    useQuery({ 
        queryKey: ['featuredposts'], 
        queryFn: () => fetchFeaturedPosts(),
        refetchOnWindowFocus: false,
    })

    if(isPending) {
        return <div className="px-[0.5rem]">Loading...</div>
    }
    if(error) {
        return <div className="px-[0.5rem]">Error fetching data...</div>
    }

    if(data.posts.length === 0) {
        return <div className="px-[0.5rem]">No Featured Posts</div>
    }

    return (
        <div
            className='flex gap-x-[0.5rem] gap-y-[0.5rem] max-lg:flex-col lg:justify-center'
        >
            {
                data.posts.length > 0 && <MainFeatured data={data.posts[0]} />
            }

            {/* Sub Featured Post */}
            {/*Note: line-clamp has limited browser support */}
            <div className='flex flex-col gap-y-[0.5rem] max-lg:gap-y-[1rem] lg:w-[49%]'>
                {data?.posts?.length >= 2 &&
                    data.posts.map((item, index) => {
                        if(index > 0) {
                            return <SubFeatured data={item} />
                        }else return null
                    })
                }
            </div>

        </div>
    )
}

export default FeaturedPosts