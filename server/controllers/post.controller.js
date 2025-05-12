import CommentModel from "../db/models/comment.model.js"
import PostModel from "../db/models/post.model.js"
import { checkClerkUser } from "../utils/clerk.js"
import { deletePostCoverImg, uploadPostCoverImg } from "../utils/imgkit.js"

export const getPosts = async (req, res) => {
    //1 is default page
    const page = parseInt(req.query.page) || 1
    //5 is default limit
    const limit = parseInt(req.query.limit) || 5

    const postsCount = await PostModel.countDocuments()
    const morePages = page*limit < postsCount

    const posts = await PostModel.find({},'_id image createdAt category title desc slug').
    limit(limit).skip((page-1)*limit).populate('author', 'username -_id').sort({ createdAt: -1 })
    return res.status(200).json({posts, morePages})
}

export const getPost = async (req, res) => {
    const post = await PostModel.findOne({_id: req.params.id}, 
    'image createdAt category title desc content author _id').populate('author', 'username avatar -_id')
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
    // Sanitize slug because it will be placed in the url
    // to mitigate potential XSS or other kind of attacks.
    // The regex here only allows alpha-numeric characters and
    // the '-' character.
    // '^' is a negation meaning, all characters that don't
    // match the condition below will be removed
    slug = slug.replace(/[^a-zA-Z0-9\-]/g, '')

    // Sanitize description and title because it will be placed in an HTML document.
    // Note: React automatically converts everything we put in a component
    // in String. This may not be needed unless you're putting them in HTML document
    // using innerHTML() or react's dangerouslySetInnerHTML() functions.
    // Replace angled brackets with their symbols to mitigate XSS attacks
    let postDesc = req.body.desc.replace(/</g, '&lt;')
    postDesc = postDesc.replace(/>/g, '&gt;')
    let postTitle = req.body.title.replace(/</g, '&lt;')
    postTitle = postTitle.replace(/>/g, '&gt;')

    const coverImg = req.body.coverImg
    //Note: 'content' property comes from react-quill editor may not be
    //properly sanitized.
    const record = { author:user._id, slug, ...req.body, desc: postDesc, title: postTitle}
    delete record['coverImg']

    
    const newPost = new PostModel(record)
    const createdPost = await newPost.save()
    if(createdPost) {

        const postCover = await uploadPostCoverImg(coverImg, user._id, createdPost._id)

        //If cover image is not uploaded
        if(!postCover) {
            //Delete the newly created post.
            await PostModel.deleteOne({ _id: createdPost._id })
            return res.status(500).json("Cover Image Upload Failed.")
        }

        createdPost.image = postCover.url
        createdPost.image_id = postCover.fileId
        await createdPost.save()

        return res.status(201).json({
            id: createdPost._id,
            slug
        })
    }
    
    return res.status(500).json("Can't Create Post. Internal Server Error.")
}

export const deletePost = async (req,res) => {
    const clerk_Id = req.auth.userId

    const user = await checkClerkUser(res, clerk_Id)
    if(!user) return

    const post = await PostModel.findOne({_id: req.params.id}, 'saved_by_users image_id').
    populate('saved_by_users')

    //Remove post entry in every user that saved this post
    for(let i = 0; i < post.saved_by_users.length; i++) {
        for(let j = 0; j < post.saved_by_users[i].posts.length; j++) {
            if(req.params.id === post.saved_by_users[i].posts[j].toString()) {
                post.saved_by_users[i].posts.splice(j, 1)
                await post.saved_by_users[i].save()
                break
            }
        }
    }

    const deletedComments = await CommentModel.deleteMany({post: req.params.id})

    if(!deletedComments) {
        return res.status(500).json("Delete Operation Failed. Internal Server Error.")
    }

    if(post?.image_id) deletePostCoverImg(post.image_id)

    const deletedPost = await PostModel.findByIdAndDelete({
        _id:req.params.id,
        author:user._id
    })

    if(!deletedPost) {
        return res.status(403).json("Invalid Authorization.")
    }
    
    return res.status(200).json("Post Deleted")
}