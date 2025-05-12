import express from 'express'
import { createPost, deletePost, featurePost, getPost, getPosts, getPostFeatured } from '../controllers/post.controller.js'

const router = express.Router()

router.get('/feature/:id', getPostFeatured)
router.patch('/feature/:id', featurePost)
router.get('/', getPosts)
router.post('/write', express.json({ type: 'application/json', limit: '5mb' }), createPost)
router.get('/:id/:slug', getPost)
router.delete('/:id', deletePost)

export default router