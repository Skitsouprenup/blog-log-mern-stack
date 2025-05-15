import { Link } from "react-router"
import { trim_text } from "../../../../js/utils"
import ImgKitImage from "../../../utils/ImgKitImage"
import PostSubInfo from "../../PostSubInfo"


const MainFeatured = ({data}) => {
  return (
    <div className='
        flex flex-col gap-y-[0.5rem] max-lg:pb-[2rem] max-lg:items-center lg:w-[49%]'>
        <div className='w-fit'>
            <ImgKitImage width='800px' src={data?.image} className='rounded-xl object-cover'/>
        </div>
        <div
            className='flex gap-x-[0.5rem]'
        >
            <PostSubInfo data={data}/>
        </div>
        <div className='text-lg font-semibold max-lg:text-center hover:underline'>
            <Link to={`/${data._id}/${data.slug}`}>
                {data.title}
            </Link>
        </div>
        <div 
            className='text-md max-lg:text-center text-gray-800 font-medium'
        >
            {trim_text(data?.desc || '', 150, 100)}
        </div>
    </div>
  )
}

export default MainFeatured