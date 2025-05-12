import { useMutation } from "@tanstack/react-query"
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from "react-toastify"

const getPostFeaturedStatus = async (postId, getToken) => {
    const token = await getToken()
    const apiUrl = `${import.meta.env.VITE_API_URL}/posts/feature/${postId}`
    const res = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    return res.data
}

const useActionTanstack = (postId, queryClient, getToken, navigate) => {

    const featuredQuery = useQuery({ 
        queryKey: ['featuredpost',postId], 
        queryFn: () => getPostFeaturedStatus(postId, getToken),
        onError: (error) => console.log(error)
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

    const featureMutation = useMutation({
        mutationFn: async (isFeatured) => {
            const token = await getToken()
            return axios.patch(`${import.meta.env.VITE_API_URL}/posts/feature/${postId}`, 
            {
                isFeatured
            }, 
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['featuredpost',postId]})
        },
    })

    return [featureMutation, featuredQuery, saveMutation, deleteMutation]
}

export default useActionTanstack