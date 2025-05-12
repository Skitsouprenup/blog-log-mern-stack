import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useAuth, useUser } from '@clerk/clerk-react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useNavigate } from "react-router"
import { toast } from "react-toastify"

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

const useActionTanstack = (postId) => {
    const {user} = useUser()
    const {getToken} = useAuth()
    const queryClient = useQueryClient()

    const navigate = useNavigate()

    const query =
    //revalidate query cache if postId in queryKey changes 
    useQuery({ 
        queryKey: ['usersavedposts',postId], 
        queryFn: () => checkIfPostSavedByUser(postId, getToken) 
    })

    const saveMutation = useMutation({
        //This is executed when mutate() function is called
        //by this mutation variable
        mutationFn: async () => {
            const token = await getToken()
            return axios.patch(`${import.meta.env.VITE_API_URL}/users/save/${postId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        },
        onSuccess: () => {
            //refresh savedposts cache 
            queryClient.invalidateQueries({queryKey: ['usersavedposts',postId]})
          },
    })

    const deleteMutation = useMutation({
        mutationFn: async () => {
            const token = await getToken()
            return axios.delete(`${import.meta.env.VITE_API_URL}/posts/${postId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
            })
        },
        onSuccess: () => {
            toast("Post Deleted.")
            navigate("/")
        }
    })

    return [saveMutation, deleteMutation, query]
}

export default useActionTanstack