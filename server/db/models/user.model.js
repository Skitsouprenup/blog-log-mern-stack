import mongoose from "mongoose"

//Schema is a structure of a record in a mongodb document
const userSchema = new mongoose.Schema({
    clerk_id: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    avatar: String,
    posts: {
        type: [{type:mongoose.Schema.Types.ObjectId, ref: "Posts"}],
        default: []
    }
}, {timestamps: true});

//Model is an object that is bound to a database record
//in our database.
const UserModel = mongoose.model('Users', userSchema);

export default UserModel