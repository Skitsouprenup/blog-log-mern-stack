import {format} from 'timeago.js'

const Comment = ({data, deleteComment}) => {

  return (
    <div className='flex flex-col gap-y-[1rem] bg-stone-50 rounded-xl p-[1rem] drop-shadow-sm'>
      <div className='flex gap-x-[0.5rem] items-center justify-between'>
        <div className='flex gap-x-[0.5rem] items-center'>
          <img src={data?.author.avatar} className='w-[48px] rounded-full'/>
          <p className='text-md'>{data?.author.username}</p>
          <p className='text-gray-600'>{format(data?.createdAt)}</p>
        </div>
        {
          deleteComment.isPending ? (<p>Deleting...</p>) :
          (<button 
            onClick={() => deleteComment.mutate(data?._id)}
            type="button" 
            className='hover:text-red-400 cursor-pointer text-md p1-[0.5rem]'
            disabled={deleteComment.isPending}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
            </svg>
          </button>)
        }
      </div>

      <div>
        {data?.content}
      </div>
    </div>
  )
}

export default Comment