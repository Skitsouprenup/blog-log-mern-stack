import {useAuth, useUser} from '@clerk/clerk-react'

import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css'

import { useRef, useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import axios from 'axios'
import { useParams } from 'react-router'
import { modules } from '../../js/quill'
import { encodeImageFileAsURL, trim_text } from '../../js/utils'
import FormError from '../utils/FormError'

const EditBlog = ({data, setEditMode, refetch}) => {
    const {isLoaded, isSignedIn} = useUser()
    const {getToken} = useAuth()
    const mainDivRef = useRef(null)

    const [content, setContent] = useState('')
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [coverImg, setCoverImg] = useState(null)

    const [formError, setFormError] = useState('')

    const {id: postId} = useParams()        

    /* 
        Assigning html in the text editor is dangerous.
        It can make your app vulnerable to XSS attacks.
        Make sure the fetched data source is properly 
        sanitized and trusted.
    */
    useEffect(() => {
        setContent(data.content)
        setTitle(data.title)
        setDesc(data.desc)
    }, [data])

    if(!isLoaded) {
        <div>
        <p>Loading...</p>
        </div>
    }

    if(isLoaded && !isSignedIn) {
        <div>
        <p>Login first to edit a blog</p>
        </div>
    }

    const mutation = useMutation({
        //This is executed when mutate() function is called
        //by this mutation variable
        mutationFn: async (editedPost) => {
            //console.log(editedPost)
            const token = await getToken()
            return axios.post(`${import.meta.env.VITE_API_URL}/posts/edit/${postId}`, editedPost, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        },
        onSuccess: (res) => {
        toast("Post successfully edited!")
        refetch()
        },
        onError: (error) => {
        setFormError(error.message + 
        ". If you get '413' error, try reducing the content of your blog." +
        " Reduce number of images in your content or upload images with low file size.")
        }
    })

    /*
        Set main div's height to screen height and center its
        content if the div's height is less than the viewport height.
        Otherwise, you will have a blank white space on the bottom
        of your screen because main layout's box with background color 
        takes the size of the main div.

        Note: This is only implemented during initial render due to
        this useEffect. To implement this dynamically, add the changeHeight
        function in 'onchange' event of main div.
    */
    useEffect(() => {

        const changeHeight = () => {
            if(mainDivRef.current !== null) {
                if(mainDivRef.current.style.height === '') {
                    const rect = mainDivRef.current.getBoundingClientRect();
                    const viewportHeight = window.innerHeight

                    if(rect.height < viewportHeight) {
                        mainDivRef.current.style.height = '100vh'
                        mainDivRef.current.style.justifyContent = 'center'
                    }
                }
            }
        }
        changeHeight()
    },[])

    const removeCoverImg = () => {
        setCoverImg(null)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if(!content.trim()) {
        setFormError('Please put content in the editor.')
        return
        }

        const formData = new FormData(e.target)

        const data = {
        title: formData.get('title').trim(),
        category: formData.get('category'),
        desc: formData.get('desc').trim(),
        content,
        }
        if(coverImg) data['coverImg'] = coverImg?.imgBase64

        if(!data.title) {
        setFormError("'title' field is empty.")
        return
        }

        mutation.mutate(data)
    }

    return (
        <div 
        className='flex flex-col gap-y-[1rem] sm:p-[2rem] max-sm:p-[1rem]'
        ref={mainDivRef}
        >
        <h1 className='font-semibold text-xl'>Edit Post</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-y-[1rem]'>

            <div className='flex gap-x-[0.75rem] items-center'>
            <label className='p-[0.5rem] bg-stone-50 rounded-xl cursor-pointer
                w-[fit-content] drop-shadow-sm hover:bg-emerald-300'>
                <input type="file" className='hidden' onChange={(e) => encodeImageFileAsURL(e, setCoverImg)}/>
                New Cover Image
            </label>
            {
                coverImg && (
                <div className='flex gap-x-[0.75rem] items-center'>
                    <p>{trim_text(coverImg?.name, 20, 15)}</p>
                    <button type='button' onClick={removeCoverImg}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="hover:fill-red-400 cursor-pointer bi bi-x-square-fill" viewBox="0 0 16 16">
                            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708"/>
                        </svg>
                    </button>
                </div>
                )
            }
            </div>

            <input 
                type='text'
                maxLength='100'
                placeholder='Title...'
                className='p-[0.5rem] bg-stone-50 rounded-xl w-[fit-content] drop-shadow-sm text-lg
                outline-none'
                name='title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <div className='flex gap-x-[0.75rem] items-center'>
            <p className='font-medium'>Choose Category:&nbsp;</p>
            <select
                className='p-[0.5rem] pr-[1rem] bg-stone-50 rounded-xl w-[fit-content] drop-shadow-sm'
                name='category' defaultValue={data.category}
            >
                <option value='General'>General</option>
                <option value='Software'>Sotfware</option>
                <option value='Travel'>Travel</option>
                <option value='Gaming'>Gaming</option>
                <option value='Art'>Art</option>
            </select>
            </div>
            <div 
                className='flex gap-[0.75rem] p-[0.5rem] bg-stone-50 rounded-xl 
                w-[100%] drop-shadow-md items-center'
            >
            <textarea
                rows='2'
                maxLength='1000'
                className='resize-none flex-1 text-lg outline-none rounded-lg p-[0.25rem]'
                placeholder='Short Description...'
                name='desc'
                onChange={(e) => setDesc(e.target.value)}
                value={desc}
            ></textarea>
            </div>

            <ReactQuill
            theme="snow" 
            className='bg-stone-50 h-[100%] rounded-lg'
            value={content}
            onChange={setContent}
            on
            modules={modules}
            />

            <FormError formError={formError} setFormError={setFormError}/>
    
            <div className='flex gap-x-[1rem]'>
                <button 
                    type='button' 
                    onClick={() => setEditMode(false)}
                    className='p-[0.5rem] rounded-xl cursor-pointer w-[fit-content] drop-shadow-sm
                    bg-amber-500 hover:bg-amber-400 disabled:bg-gray-500'
                    disabled={mutation.isPending}
                >
                    Cancel
                </button>
                <button 
                    type='submit' 
                    className='p-[0.5rem] rounded-xl cursor-pointer w-[fit-content] drop-shadow-sm 
                    not-disabled:bg-green-500 not-disabled:hover:bg-emerald-400
                    disabled:cursor-not-allowed disabled:bg-gray-500'
                    disabled={mutation.isPending}
                    >
                    {mutation.isPending ? 'Editing...' : 'Edit Post'}
                </button>
            </div>
        </form>
        </div>
    )
}

export default EditBlog