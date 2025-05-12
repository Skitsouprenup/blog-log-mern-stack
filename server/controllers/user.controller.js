import mongoose from "mongoose"
import PostModel from "../db/models/post.model.js"
import UserModel from "../db/models/user.model.js"
import { checkClerkUser } from "../utils/clerk.js"

export const getUserSavedPost = async (req, res) => {
    const clerk_Id = req.auth.userId
    
    const user = await checkClerkUser(res, clerk_Id)
    if(!user) return

    return res.status(200).json(user.posts)
}

export const checkIfPostIsSavedByUser = async (req, res) => {
    const clerk_Id = req.auth.userId
    const postId = req.params.postId;

    const user = await checkClerkUser(res, clerk_Id)
    if(!user) return

    const isSaved = user.posts.some((item) => item.toString() === postId)
    return res.status(200).json({saved: isSaved})
}

export const saveUnsavePostToUserList = async (req, res) => {
    const clerk_Id = req.auth.userId
    const postId = req.params.postId

    const user = await checkClerkUser(res, clerk_Id)
    if(!user) return

    const isSaved = user.posts.some((item) => item.toString() === postId)

    if(isSaved) {
        await UserModel.findByIdAndUpdate(user._id, {
            $pull: {posts: postId}
        })

        await PostModel.updateOne({_id: postId}, {
            $pull: {saved_by_users: user._id}
        })
    }
    else {

        await PostModel.updateOne({_id: postId}, {
            $push: {
                saved_by_users: user._id
            }
        })

        await UserModel.findByIdAndUpdate(user._id, {
            $push: {posts: postId}
        })
    }

    res.status(200).json({saved: isSaved})
}