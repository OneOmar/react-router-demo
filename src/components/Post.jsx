import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { LoadingSpinner } from './LoadingSpinner'

export const Post = () => {
  const { id } = useParams()
  const [post, setPost] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isCanceled = false

    const fetchPost = async () => {
      // Set loading state to true when fetching new post
      setLoading(true)
      try {
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${id}`
        )
        const data = await res.json()
        if (!isCanceled) {
          setPost(data)
        }
      } catch (error) {
        console.error('Error fetching post:', error)
      } finally {
        if (!isCanceled) {
          setLoading(false)
        }
      }
    }

    fetchPost()

    return () => {
      isCanceled = true
    }
  }, [id])

  return (
    <div className='container mx-auto py-2'>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className='max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6'>
          <h1 className='text-2xl font-bold mb-4'>Post {id}</h1>
          <p className='text-lg font-semibold mb-2'>{post.title}</p>
          <p className='text-gray-700'>{post.body}</p>
        </div>
      )}
    </div>
  )
}
