import { useParams } from 'react-router-dom'
import { Post } from './Post'

export const PostRoute = () => {
  const { id } = useParams()

  // Function to check if a value is a number
  const isNumeric = (value) => {
    return !isNaN(value)
  }

  // Render post if ID is a number, otherwise show invalid input message
  return (
    <>
      {isNumeric(id) ? (
        <Post />
      ) : (
        <div
          className='text-red-700 m-auto px-4 py-3 h-fit bg-red-100 border border-red-400 rounded'
          role='alert'
        >
          <strong className='font-bold'>Error:</strong>
          <span> Invalid post ID: {id}</span>
        </div>
      )}
    </>
  )
}
