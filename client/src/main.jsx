import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router"
import { ToastContainer } from 'react-toastify'

import './index.css'
import MainLayout from './layouts/MainLayout.jsx'
import Home from './components/pages/Home.jsx'
import PostList from './components/pages/PostList.jsx'
import Login from './components/pages/Login.jsx'
import Register from './components/pages/Register.jsx'
import WriteBlog from './components/pages/WriteBlog.jsx'
import SinglePost from './components/pages/SinglePost.jsx'

// Create a client
const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: Home },
      {
        path: "/posts",
        Component: PostList,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/write",
        Component: WriteBlog,
      },
      {
        path: "/:id/:slug",
        Component: SinglePost,
      },
    ]
  },
  
]);

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl='/'>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ToastContainer position="bottom-right"/>
      </QueryClientProvider>
    </ClerkProvider>
  </StrictMode>
)
