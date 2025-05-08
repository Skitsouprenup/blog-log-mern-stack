import express from 'express'
import userRouter from './routes/user.route.js'
import postRouter from './routes/post.route.js'
import commentRouter from './routes/comment.route.js'
import clerkWebHookRouter from './routes/clerk.webhook.route.js'
import { clerkMiddleware } from '@clerk/express'

import {dbConnection} from './db/database.js'

const app = express()
const port = 3000
const hostName = '127.0.0.1'

// This middleware checks the request's cookies and headers for
// a session JWT and if found, attaches the Auth object to the request object 
// under the auth key.
//You can get the JWT token in getToken() function in useAuth() function
//of clerk-react.
app.use(clerkMiddleware())

// Move this route on top of express.json()
// so that express won't modify the body of request
// coming to this route
app.use("/webhooks",clerkWebHookRouter)

/* Middlewares */
//This middleware parses incoming requests with JSON payloads
//app.use(express.json())

/* Error Handler. This is executed when there's an uncaught error 
   in one of our routes
*/
app.use((error, req, res, next) => {
    res.status(error.status || 500)

    console.log(error.stack)

    res.json({
        message: error.message || 'Internal Server Error',
        status: error.status,
    })
})


/*Routers */
app.use("/users",userRouter)
app.use("/posts",postRouter)
app.use("/comments",commentRouter)

app.listen(port, hostName, () => {
    dbConnection()
    console.log(`Example app listening on ${hostName}:${port}`)
})