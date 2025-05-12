import express from 'express'
import { checkIfPostIsSavedByUser, getUserSavedPost, saveUnsavePostToUserList } from '../controllers/user.controller.js'

const router = express.Router()

router.get('/saved', getUserSavedPost)
router.get('/saved/:postId', checkIfPostIsSavedByUser)
router.patch('/save/:postId', saveUnsavePostToUserList)

export default router