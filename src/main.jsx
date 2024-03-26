import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { HomePage } from './components/HomePage.jsx'
import { Posts } from './components/Posts.jsx'
import { Post } from './components/Post.jsx'
import { NotFoundPage } from './components/NotFoundPage.jsx'
import './index.css'

// Define the routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/posts',
    element: <Posts />,
    children: [
      {
        path: ':id',
        element: <Post />
      }
    ]
  },
  {
    path: '*',
    element: <NotFoundPage />
  }
])

// Render the app
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
