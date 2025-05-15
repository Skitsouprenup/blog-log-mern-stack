import ImgKitImage from '../../utils/ImgKitImage'
import AuthorSocials from './authorinfo/AuthorSocials'

const AuthorInfo = ({data}) => {
  return (
    <div className='flex flex-col gap-y-[0.75rem] pt-[0.5rem] max-lg:items-center max-lg:w-screen'>
        <h3 className='font-medium w-fit'>Author</h3>
        <div className='flex gap-x-[0.5rem] items-center'>
            <ImgKitImage width="42px" src={data?.avatar} className='max-w-[42px] rounded-full'/>
            <p>{data?.username}</p>
        </div>
        <AuthorSocials />
    </div>
  )
}

export default AuthorInfo