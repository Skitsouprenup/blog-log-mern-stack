import express from 'express'
import userRouter from './routes/user.route.js'
import postRouter from './routes/post.route.js'
import commentRouter from './routes/comment.route.js'
import clerkWebHookRouter from './routes/clerk.webhook.route.js'
import cors from 'cors'

import { clerkMiddleware } from '@clerk/express'
import {dbConnection} from './db/database.js'

const app = express()
const port = 3000
const hostName = '127.0.0.1'

app.use(cors(process.env.CLIENT_URL))

// allow cross-origin requests
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", 
      "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

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

// This middleware checks the request's cookies and headers for
// a session JWT and if found, attaches the Auth object to the request object 
// under the auth key.
//You can get the JWT token in getToken() function in useAuth() function
//of clerk-react.
app.use(clerkMiddleware())

/* Middlewares */
// This middleware parses incoming requests with JSON payloads
// Except for '/posts/write' and '/posts/edit'  because I need to 
// edit their request body size to be bigger. For '/webhooks' 
// route, we don't want express to modify the request body 
// coming to that route. Otherwise, webhook verification will fail
app.use(/^\/(?!posts\/write$|posts\/edit\/[a-zA-Z0-9]+$|webhooks$).*/, express.json())

/*Routers */
app.use("/users",userRouter)
app.use("/posts",postRouter)
app.use("/comments",commentRouter)
app.use("/webhooks",clerkWebHookRouter)

app.listen(port, hostName, () => {
    dbConnection()
    console.log(`Example app listening on ${hostName}:${port}`)
})