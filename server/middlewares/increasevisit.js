import PostModel from "../db/models/post.model.js"

export const increaseVisit = async (req, res, next) => {
    await PostModel.findOneAndUpdate(
        {_id: req.params.id},
        {$inc:{visit_count:1}}
    )

    next()
}