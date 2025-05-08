import PostModel from "../db/models/post.model.js"
import { checkClerkUser } from "../utils/clerk.js"

export const getPosts = async (req, res) => {
    const posts = PostModel.find()
    res.status(200).json(posts)
}

export const getPost = async (req, res) => {
    const post = PostModel.find({slug: req.params.slug})
    res.status(200).json(post)
}

export const createPost = async (req,res) => {
    const clerk_Id = req.auth.userId
    
    const user = await checkClerkUser(res, clerk_Id)
    if(!user) return

    const newPost = new PostModel({ author:user._id, ...req.body})

    const createdPost = await newPost.save()
    res.status(201).json(createdPost)
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