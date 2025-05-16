import CommentModel from "../db/models/comment.model.js"
import PostModel from "../db/models/post.model.js"
import { checkClerkUser } from "../utils/clerk.js"
import { filterPostQueries } from "../utils/general.js"
import { deletePostCoverImg, uploadPostCoverImg } from "../utils/imgkit.js"

export const getPosts = async (req, res) => {
    //1 is default page
    const page = parseInt(req.query.page) || 1
    //5 is default limit
    const limit = parseInt(req.query.limit) || 5

    const postsCount = await PostModel.countDocuments()
    const morePages = page*limit < postsCount

    const userQuery = req.query
    const filteredQuery = {}
    filterPostQueries(userQuery, filteredQuery)
    const sortQuery = filteredQuery?.sort || { createdAt: -1 }

    let authorPopulateObj = {
        path: 'author',
        select: 'username',
    }
    if(filteredQuery?.author) {
        authorPopulateObj['match'] = {'username': {$eq: filteredQuery.author}}
    }

    /* Delete queries that are not need in the find() filter */
    delete filteredQuery['sort']
    delete filteredQuery['author']

    const posts = await PostModel.find(filteredQuery,'_id image createdAt category title desc slug visit_count').
    limit(limit).skip((page-1)*limit).populate(authorPopulateObj).sort(sortQuery)
    return res.status(200).json({posts, morePages})
}

export const getRecentPosts = async (req, res) => {
    const posts = await PostModel.find({createdAt: {
            //Posts from previous week
            $gte: Date.now() - (7 * 24 * 60 * 60 * 1000)
        }
    }).populate('author').sort({createdAt: -1})

    if(!posts) {
        return res.status(500).json("Can't fetch post. Internal Server Error.")
    }
    return res.status(200).json({posts})
}

export const getFeaturedPosts = async (req,res) => {
    const posts = await PostModel.find({isFeatured: true}).populate('author').limit(4).sort({createdAt: -1})

    if(!posts) {
        return res.status(500).json("Can't fetch post. Internal Server Error.")
    }
    return res.status(200).json({posts})
}

export const getPost = async (req, res) => {
    const post = await PostModel.findOne({_id: req.params.id}, 
    'image createdAt category title desc content author _id visit_count').populate('author', 'username avatar -_id')
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
    // to mitigate/prevent potential attacks.
    // The regex here only allows alpha-numeric characters and
    // the '-' character.
    // '^' is a negation meaning, all characters that don't
    // match the condition below will be removed
    slug = slug.replace(/[^a-zA-Z0-9\-]/g, '')

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

export const editPost = async (req,res) => {
    const clerk_Id = req.auth.userId
    const postId = req.params.id

    const user = await checkClerkUser(res, clerk_Id)
    if(!user) return

    const targetPost = await PostModel.findOne({_id: postId}).populate('author')
    const requestBody = req.body

    if(targetPost.author._id.toString() !== user._id.toString()) {
        return res.status(401).json('Invalid Authentication')
    }

    if(requestBody.title === targetPost.title) {
        delete requestBody['title']
    }
    else {
        let slug = req.body.title.replace(/ /g, '-').toLowerCase()
        slug = slug.replace(/[^a-zA-Z0-9\-]/g, '')
        requestBody['slug'] = slug
    }

    const coverImg = requestBody?.coverImg
    delete requestBody['coverImg']

    const updatedPost = await PostModel.findOneAndUpdate({_id: postId}, requestBody)
    if(updatedPost && coverImg) {

        const postCover = await uploadPostCoverImg(coverImg, user._id, updatedPost._id)

        //If cover image is not uploaded
        if(!postCover) {
            //Delete the newly created post.
            await PostModel.deleteOne({ _id: updatedPost._id })
            return res.status(500).json("Cover Image Upload Failed.")
        }

        //Delete previous image
        if(updatedPost?.image_id) deletePostCoverImg(updatedPost.image_id)

        updatedPost.image = postCover.url
        updatedPost.image_id = postCover.fileId
        await updatedPost.save()

        return res.status(201).json({
            id: updatedPost._id,
            slug: updatedPost.slug
        })
    }
    
    if(updatedPost) {
        return res.status(201).json({
            id: updatedPost._id,
            slug: updatedPost.slug
        })
    }

    return res.status(500).json("Can't Edit Post. Internal Server Error.")
}

export const deletePost = async (req,res) => {
    const clerk_Id = req.auth.userId
    const userRole = req.auth.sessionClaims?.metadata?.role || "user"

    let user = null

    if(userRole !== 'admin') {
        user = await checkClerkUser(res, clerk_Id)
        // Must be a registered user recorded in the database or
        // an admin to delete post
        if(!user) return
    }

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

    let deletedPost = null

    if(userRole !== 'admin') {
        deletedPost = await PostModel.findByIdAndDelete({
            _id:req.params.id,
            author:user?._id
        })
    }
    else deletedPost = await PostModel.findByIdAndDelete({_id:req.params.id})

    if(!deletedPost) {
        return res.status(403).json("Invalid Authorization.")
    }
    
    return res.status(200).json("Post Deleted")
}

export const getPostFeatured = async (req, res) => {
    const clerk_Id = req.auth.userId
    const userRole = req.auth.sessionClaims?.metadata?.role || "user"
    const postId = req.params.id

    let user = null

    if(userRole !== 'admin') {
        user = await checkClerkUser(res, clerk_Id)
        // Must be a registered user recorded in the database or
        // an admin to delete post
        if(!user) return
    }

    const post = await PostModel.findOne({_id: postId}, 'isFeatured')

    if(!post) {
        return res.status(500).json("Can't find post. Internal Server Error.")
    }

    return res.status(200).json({isFeatured: post?.isFeatured})
}

export const featurePost = async (req, res) => {
    const clerk_Id = req.auth.userId
    const userRole = req.auth.sessionClaims?.metadata?.role || "user"
    const postId = req.params.id

    const isFeatured = req.body.isFeatured

    let user = null

    if(userRole !== 'admin') {
        user = await checkClerkUser(res, clerk_Id)
        // Must be a registered user recorded in the database or
        // an admin to delete post
        if(!user) return
    }

    const post = await PostModel.updateOne({_id: postId}, {
        isFeatured: !isFeatured 
    })

    if(!post) {
        return res.status(500).json("Can't update post. Internal Server Error.")
    }

    return res.status(200).json("Post Updated.")
}