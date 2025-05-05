import { SignUp } from '@clerk/clerk-react'

const Register = () => {
  return (
    <div className='flex justify-center items-center h-screen w-[100%] pt-[2rem]'>
      <div className='bg-neutral-200 w-[100%] pb-[1rem] flex justify-center'>
        <SignUp signInUrl='/login'/>
      </div>
    </div>
  )
}

export default Register