import React from 'react'
import {useUser} from '@clerk/clerk-react'

const WriteBlog = () => {
  const {isLoaded, isSignedIn} = useUser()

  return (
    <div>WriteBlog</div>
  )
}

export default WriteBlog