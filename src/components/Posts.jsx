import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { LoadingSpinner } from './LoadingSpinner'

export const Posts = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Flag to check if the component is unmounted
    // This flag will be used to prevent setting state on an unmounted component!
    // This is a common pattern to avoid memory leaks
    let isCanceled = false
    const fetchPosts = async () => {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts')
        const data = await res.json()
        if (!isCanceled) {
          // Check if the component is unmounted
          // If not, update the state
          setPosts(data.slice(0, 10))
        }
      } catch (error) {
        console.error('Error fetching posts:', error)
      } finally {
        if (!isCanceled) {
          setLoading(false)
        }
      }
    }

    fetchPosts()
    // Cleanup function to cancel the fetch request
    // This function will be called when the component is unmounted
    return () => {
      isCanceled = true
    }
  }, [])

  // Classes for the NavLink component
  const baseClasses =
    'text-blue-500 px-2 py-1 rounded-md border border-blue-500 whitespace-nowrap hover:bg-blue-500 hover:text-white'

  const getDynamicClasses = (isActive) =>
    isActive ? `${baseClasses} bg-blue-500 text-white` : baseClasses

  return (
    <div className='container mx-auto p-10'>
      {loading ? (
        // <div className='text-center'>Loading posts...</div>
        <LoadingSpinner />
      ) : (
        <div className='flex gap-5'>
          <div className='flex flex-col gap-2'>
            {posts.map((post) => (
              <NavLink
                key={post.id}
                to={`/posts/${post.id}`}
                className={({ isActive }) => getDynamicClasses(isActive)}
              >
                Post {post.id}
              </NavLink>
            ))}
          </div>
          <Outlet />
          <Link to='/' className='text-blue-500 hover:text-blue-700'>
            Go back to homepage!
          </Link>
        </div>
      )}
    </div>
  )
}
