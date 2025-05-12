import useActionTanstack from '../../../js/hooks/useActionTanstack'

const Actions = ({postId}) => {

    const [saveMutation, deleteMutation, {isPending, error, data}] = useActionTanstack(postId)

    return (
        <div className='flex flex-col gap-y-[0.75rem]'>
            <h3 className='font-medium'>Actions</h3>

            <div className='flex gap-x-[0.5rem] items-center'>
                <button
                    onClick={() => saveMutation.mutate()}
                    type='button' 
                    className='cursor-pointer group disabled:cursor-not-allowed
                    disabled:fill-gray-500'
                    disabled={isPending || saveMutation.isPending}
                >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="group-hover:fill-red-400 bi bi-save2" viewBox="0 0 16 16">
                    <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v4.5h2a.5.5 0 0 1 .354.854l-2.5 2.5a.5.5 0 0 1-.708 0l-2.5-2.5A.5.5 0 0 1 5.5 6.5h2V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1z"/>
                </svg>
                </button>
                {
                    isPending && !saveMutation.isPending &&
                    ((<p className='text-zinc-600'>Loading...</p>))
                }
                {
                    !isPending && saveMutation.isPending &&
                    ((<p className='text-zinc-600'>{data?.saved ? 'Unsaving...' : 'Saving...'}</p>))
                }
                {
                    !isPending && !saveMutation.isPending && 
                        (<p className='text-zinc-600'>{error ? 'Error' : data?.saved ? 'Unsave Post' : 'Save Post'}</p>)
                }
            </div>

            <div className='flex gap-x-[0.5rem] items-center'>
                <button 
                    onClick={() => deleteMutation.mutate()}
                    type='button' 
                    className='cursor-pointer group disabled:cursor-not-allowed
                    disabled:fill-gray-500'
                    disabled={isPending || deleteMutation.isPending}
                >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="group-hover:fill-red-400 bi bi-file-x" viewBox="0 0 16 16">
                    <path d="M6.146 6.146a.5.5 0 0 1 .708 0L8 7.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 8l1.147 1.146a.5.5 0 0 1-.708.708L8 8.707 6.854 9.854a.5.5 0 0 1-.708-.708L7.293 8 6.146 6.854a.5.5 0 0 1 0-.708"/>
                    <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1"/>
                </svg>
                </button>
                <p className='text-zinc-600'>{deleteMutation.isPending ? 'Deleting...' : 'Delete Post'}</p>
            </div>
        </div>
    )
}

export default Actions