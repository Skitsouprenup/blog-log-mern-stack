import CommentModel from '../db/models/comment.model.js'
import { checkClerkUser } from "../utils/clerk.js"

export const getComments = async (req, res) => {
    const postId = req.params.postId

    const comments = await CommentModel.find({post: postId},'author content createdAt')
    .populate('author', 'username avatar -_id').sort({ createdAt: -1 })
    return res.status(200).json({comments})
}

export const createComment = async (req, res) => {
    const clerk_Id = req.auth.userId
    
    const user = await checkClerkUser(res, clerk_Id)
    if(!user) return

    const record = { ...req.body, author:user._id }

    const newComment = await new CommentModel(record).save()

    if(newComment)
        return res.status(201).json("Comment Created.")

    return res.status(500).json("Can't Create Comment. Internal Server Error.")
}

export const deleteComment = async (req, res) => {
    const clerk_Id = req.auth.userId
    
    const user = await checkClerkUser(res, clerk_Id)
    if(!user) return

    const deletedPost = await CommentModel.findByIdAndDelete({
        _id:req.params.id,
        author:user._id
    })

    if(!deletedPost) {
        return res.status(403).json("Invalid Authorization.")
    }
    
    return res.status(200).json("Comment Deleted")
}
