import { trim_text } from "../../../../js/utils"
import ImgKitImage from "../../../utils/ImgKitImage"
import PostSubInfo from "../../PostSubInfo"


const MainFeatured = ({data}) => {
  return (
    <div className='flex flex-col gap-y-[0.5rem] max-lg:pb-[2rem] max-lg:items-center'>
        <div className='w-[fit-content]'>
            <ImgKitImage width='400px' src={data?.image} className='rounded-xl object-cover'/>
        </div>
        <div
            className='flex gap-x-[0.5rem]'
        >
            <PostSubInfo data={data}/>
        </div>
        <div 
            className='text-xl font-semibold max-lg:text-center'
        >
            {trim_text(data?.desc || '', 200, 150)}
        </div>
    </div>
  )
}

export default MainFeatured