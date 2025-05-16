import { useQuery } from '@tanstack/react-query'
import PostEntry from '../PostEntry'
import axios from 'axios'

const fetchRecentPosts = async () => {
    const apiUrl = `${import.meta.env.VITE_API_URL}/posts/recent`
    const res = await axios.get(apiUrl)
    return res.data
}

const RecentPosts = () => {

    const { isPending, error, data } = 
    //revalidate query cache if id or slug in queryKey changes
    useQuery({ 
        queryKey: ['recentposts'], 
        queryFn: () => fetchRecentPosts(),
        refetchOnWindowFocus: false,
    })

    if(!data || !data?.posts || data?.posts?.length === 0 || error) {
        return (
            <div className='flex gap-y-[1rem] p-[0.5rem] flex-col'>
                <h1 className='text-[1.5rem] font-semibold'>Recent Posts</h1>
                <h2 className='text-[1rem] text-gray-800 font-medium'>
                    {
                        error ? 'Error Fetching Data' : 'No Recent Posts'
                    }
                </h2>
            </div>
        )
    }

    return (
        <div className='flex gap-y-[1rem] p-[0.5rem] flex-col'>
            <h1 className='text-[1.5rem] font-semibold'>Recent Posts</h1>
            {
                isPending && (
                    <h2 className='text-[1rem] text-gray-800 font-medium'>Loading...</h2>
                )
            }
            {
                !isPending && data?.posts?.map((item) => (
                    <PostEntry key={item?._id} data={item} />
                ))
            }
        </div>
    )
}

export default RecentPosts