import UserModel from "../db/models/user.model.js"

export const checkClerkUser = async (res, user_id) => {
    if(!user_id) {
        res.status(401).json("Invalid Authentication")
        return null
    }

    const user = await UserModel.findOne({clerk_id: user_id})

    if(!user) {
        res.status(404).json("User Doesn't Exist.")
        return null
    }

    return user
}