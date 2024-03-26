import { Link } from 'react-router-dom'

export const HomePage = () => {
  return (
    <div className='container mx-auto py-8'>
      <h1 className='mb-10 text-3xl font-bold text-center'>React Router v6</h1>
      <div className='text-center'>
        <Link to='/posts' className='text-blue-500 hover:text-blue-700'>
          Go to posts!
        </Link>
      </div>
    </div>
  )
}
