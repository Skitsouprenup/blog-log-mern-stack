import express from 'express'
import { clerkWebhook } from '../controllers/clerk.webhook.controller.js'

const router = express.Router()

router.post('/clerk', express.raw({ type: 'application/json' }), clerkWebhook)

export default router