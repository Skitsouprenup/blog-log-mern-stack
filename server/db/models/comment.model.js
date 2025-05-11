import mongoose from "mongoose"

const commentSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        //Refers to models/document in the database
        ref: "Users",
        required: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        //Refers to models/document in the database
        ref: "Posts",
        required: true
    },
    content: {
        type: String,
        required: true
    },
}, {timestamps: true})

const CommentModel = mongoose.model('Comments', commentSchema);

export default CommentModel