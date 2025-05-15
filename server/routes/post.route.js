import express from 'express'
import { createPost, deletePost, featurePost, getPost, getPosts, getPostFeatured, getFeaturedPost, editPost } from '../controllers/post.controller.js'
import { increaseVisit } from '../middlewares/increasevisit.js'

const router = express.Router()

router.get('/', getPosts)
router.post('/write', express.json({ type: 'application/json', limit: '5mb' }), createPost)
router.get('/featured', getFeaturedPost)
router.get('/feature/:id', getPostFeatured)
router.patch('/feature/:id', featurePost)
router.post('/edit/:id', express.json({ type: 'application/json', limit: '5mb' }), editPost)
router.get('/:id/:slug', increaseVisit, getPost)
router.delete('/:id', deletePost)

export default router