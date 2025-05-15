import { Link } from "react-router"
import { trim_text } from "../../../../js/utils"
import ImgKitImage from "../../../utils/ImgKitImage"
import PostSubInfo from "../../PostSubInfo"

const SubFeatured = ({data}) => {

    /*Note: line-clamp has limited browser support */
    return (
        <div className='flex flex-col gap-y-[0.5rem] max-lg:gap-y-[1rem]'>
            <div className='flex gap-x-[0.5rem]'>
                <div>
                    <div>
                        <ImgKitImage width='200px' src={data?.image} className='max-sm:max-w-[150px] sm:max-w-[200px] rounded-lg'/>
                    </div>
                </div>

                <div className='flex flex-col gap-y-[0.5rem] max-sm:line-clamp-4'>
                    <div
                        className='flex gap-x-[0.5rem] items-center max-sm:pb-[0.5rem]'
                    >
                        <PostSubInfo data={data}/>
                    </div>
                    <div className='sm:text-lg font-semibold max-sm:text-[0.8rem] hover:underline'>
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
            </div>
        </div>
  )
}

export default SubFeatured