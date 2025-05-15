import axios from 'axios'
import useActionTanstack from '../../../js/hooks/useActionTanstack'
import { useQuery } from '@tanstack/react-query'

const checkIfPostSavedByUser = async (postId, getToken) => {
    const token = await getToken()
    const apiUrl = `${import.meta.env.VITE_API_URL}/users/saved/${postId}`
    const res = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    return res.data
}

const Actions = ({postId, author, navigate, queryClient, getToken, user, setEditMode}) => {

    const userSavedQuery =
    //revalidate query cache if postId in queryKey changes 
    useQuery({ 
        queryKey: ['usersavedposts',postId], 
        queryFn: () => checkIfPostSavedByUser(postId, getToken),
    })

    const maxLgStyle = 'max-lg:w-[175px] max-lg:pl-[1.25rem]'

    const [
        featureMutation,
        featuredQuery,
        saveMutation, 
        deleteMutation
    ] = useActionTanstack(postId, queryClient, getToken, navigate)

    const isAdmin = user?.publicMetadata?.role === "admin" || false

    return (
        <div className='flex flex-col gap-y-[0.75rem] max-lg:items-center max-lg:w-screen py-[1rem]'>
            <h3 className='font-medium'>Actions</h3>

            {/* Save/Unsave Post */}
            <div className={`flex gap-x-[0.5rem] items-center ${maxLgStyle}`}>
                <button
                    onClick={() => {
                        if(userSavedQuery.error) return
                        saveMutation.mutate()
                    }}
                    type='button' 
                    className={
                    'cursor-pointer group disabled:cursor-not-allowed'+
                    ' disabled:fill-gray-500'
                    }
                    disabled={userSavedQuery.isPending || saveMutation.isPending || userSavedQuery.error}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="group-not-disabled:hover:fill-red-400 bi bi-save2" viewBox="0 0 16 16">
                        <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v4.5h2a.5.5 0 0 1 .354.854l-2.5 2.5a.5.5 0 0 1-.708 0l-2.5-2.5A.5.5 0 0 1 5.5 6.5h2V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1z"/>
                    </svg>
                </button>
                {
                    userSavedQuery.isPending && !saveMutation.isPending &&
                    ((<p className='text-zinc-600'>Loading...</p>))
                }
                {
                    !userSavedQuery.isPending && saveMutation.isPending &&
                    ((<p className='text-zinc-600'>{userSavedQuery?.data?.saved ? 'Unsaving...' : 'Saving...'}</p>))
                }
                {
                    !userSavedQuery.isPending && !saveMutation.isPending && 
                        (<p className='text-zinc-600'>{userSavedQuery.error ? 'Error' : userSavedQuery?.data?.saved ? 'Unsave Post' : 'Save Post'}</p>)
                }
            </div>

            {/* Delete Post */
                user && (user.username === author.username || isAdmin) && (
                    <div className={`flex gap-x-[0.5rem] items-center ${maxLgStyle}`}>
                        <button 
                            onClick={() => deleteMutation.mutate()}
                            type='button' 
                            className='cursor-pointer group disabled:cursor-not-allowed
                            disabled:fill-gray-500'
                            disabled={deleteMutation.isPending}
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="group-not-disabled:hover:fill-red-400 bi bi-file-x" viewBox="0 0 16 16">
                            <path d="M6.146 6.146a.5.5 0 0 1 .708 0L8 7.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 8l1.147 1.146a.5.5 0 0 1-.708.708L8 8.707 6.854 9.854a.5.5 0 0 1-.708-.708L7.293 8 6.146 6.854a.5.5 0 0 1 0-.708"/>
                            <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1"/>
                        </svg>
                        </button>
                        <p className='text-zinc-600'>{deleteMutation.isPending ? 'Deleting...' : 'Delete Post'}</p>
                    </div>
                )
            }

            {/*  Post */
                user && (user.username === author.username || isAdmin) && (
                    <div className={`flex gap-x-[0.5rem] items-center ${maxLgStyle}`}>
                        <button 
                            onClick={() => setEditMode(true)}
                            type='button' 
                            className='cursor-pointer group disabled:cursor-not-allowed
                            disabled:fill-gray-500'
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="group-not-disabled:hover:fill-red-400 bi bi-pencil-square" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                            </svg>
                        </button>
                        <p className='text-zinc-600'>Edit Post</p>
                    </div>
                )
            }

            {/* Feature/Unfeature Post */
                isAdmin && (
                    <div className={`flex gap-x-[0.5rem] items-center ${maxLgStyle}`}>
                        <button 
                            onClick={() => featureMutation.mutate(featuredQuery?.data?.isFeatured)}
                            type='button' 
                            className='cursor-pointer group disabled:cursor-not-allowed
                            disabled:fill-gray-500'
                            disabled={featuredQuery.isPending || featureMutation.isPending || featuredQuery.error}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="group-not-disabled:hover:fill-red-400 bi bi-star-fill" viewBox="0 0 16 16">
                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                            </svg>
                        </button>
                        {
                            featuredQuery.isPending && !featureMutation.isPending &&
                            ((<p className='text-zinc-600'>Loading...</p>))
                        }
                        {
                            !featuredQuery.isPending && featureMutation.isPending &&
                            ((<p className='text-zinc-600'>{featuredQuery?.data?.isFeatured ? 'Unfeaturing...' : 'Featuring...'}</p>))
                        }
                        {
                            !featuredQuery.isPending && !featureMutation.isPending && 
                                (<p className='text-zinc-600'>{featuredQuery.error ? 'Error' : featuredQuery?.data?.isFeatured ? 'Unfeature Post' : 'Feature Post'}</p>)
                        }
                    </div>
                )
            }
        </div>
    )
}

export default Actions