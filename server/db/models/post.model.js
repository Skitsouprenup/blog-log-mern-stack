import mongoose from "mongoose"

const postSchema = new mongoose.Schema({
    image: {
        type: String,
        default: ''
    },
    image_id: {
        type: String,
        default: ''
    },
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        default: 'general'
    },
    desc: {
        type: String,
    },
    content: {
        type: String
    },
    saved_by_users: {
        type: [{type:mongoose.Schema.Types.ObjectId, ref: "Users"}],
        default: []
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        //Refers to models/document objectId in the database
        ref: "Users",
        required: true
    },
    slug: {
        type: String,
        required: true,
    },
    visit_count: {
        type: Number,
        default: 0
    }
}, {timestamps: true})

const PostModel = mongoose.model('Posts', postSchema);

export default PostModel