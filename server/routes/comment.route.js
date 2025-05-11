import express from 'express'
import { createComment, deleteComment, getComments } from '../controllers/comment.controller.js'

const router = express.Router()

router.get('/:postId', getComments)
router.post('/:postId', createComment)
router.delete('/:id', deleteComment)

export default router