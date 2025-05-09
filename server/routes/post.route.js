import express from 'express'
import { createPost, deletePost, getPost, getPosts } from '../controllers/post.controller.js'

const router = express.Router()

router.get('/', getPosts)
router.post('/write', express.json({ type: 'application/json', limit: '5mb' }), createPost)
router.get('/:id/:slug', getPost)
router.delete('/:id', deletePost)

export default router