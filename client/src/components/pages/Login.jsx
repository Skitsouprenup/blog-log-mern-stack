import { SignIn } from '@clerk/clerk-react'

const Login = () => {
  return (
    <div className='flex justify-center items-center h-screen w-[100%]'>
      <SignIn signUpUrl='/register'/>
    </div>
  )
}

export default Login