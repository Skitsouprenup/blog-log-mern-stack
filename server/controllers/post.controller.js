import PostModel from "../db/models/post.model.js"
import { checkClerkUser } from "../utils/clerk.js"
import { uploadPostCoverImg } from "../utils/imgkit.js"

export const getPosts = async (req, res) => {
    const posts = await PostModel.find()
    return res.status(200).json(posts)
}

export const getPost = async (req, res) => {
    const post = PostModel.find({slug: req.params.slug})
    return res.status(200).json(post)
}

export const createPost = async (req,res) => {
    const clerk_Id = req.auth.userId
    
    //Returns the length of the request in bytes
    //console.log(req.headers['content-length'])

    const user = await checkClerkUser(res, clerk_Id)
    if(!user) return

    //console.log(req.body)
    let slug = req.body.title.replace(/ /g, '-').toLowerCase()

    const coverImg = req.body.coverImg
    //Note: content comes from react-quill editor may not be
    //properly sanitized.
    const record = { author:user._id, slug, ...req.body}
    delete record['coverImg']

    
    const newPost = new PostModel(record)
    const createdPost = await newPost.save()
    if(createdPost) {

        const postCover = await uploadPostCoverImg(coverImg, user._id, createdPost._id)
        createdPost.image = postCover.url
        await createdPost.save()

        user.posts.push(createdPost._id)
        await user.save()

        return res.status(201).json({
            id: createdPost._id,
            slug
        })
    }
    

    return res.status(200).json("success")
    //return res.status(500).json("Can't Create Post. Internal Server Error.")
}

export const deletePost = async (req,res) => {
    const clerk_Id = req.auth.userId

    const user = await checkClerkUser(res, clerk_Id)
    if(!user) return

    const deletedPost = await PostModel.findByIdAndDelete({
        _id:req.params.id,
        author:user._id
    })

    if(!deletedPost) {
        return res.status(403).json("Invalid Authorization.")
    }
    
    return res.status(200).json("Post Deleted")
}