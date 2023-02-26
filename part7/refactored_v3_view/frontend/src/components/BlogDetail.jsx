import { useState } from 'react'
import { Button } from '../App'
const BlogDetail = ({ blog, handleLike, handleComment }) => {
  const [ input, setInput ] = useState('')
  if (!blog) return <p>User not found!</p>

  const handleSubmit = (event) => {
    event.preventDefault()
    handleComment(blog.id, input)
  }

  return (
    <>
      <h2>{blog.title}</h2>
      <p>{blog.url}</p>
      <p>Likes {blog.likes} <Button className='like' onClick={() => handleLike(blog.id, blog.likes + 1)}>like<span className='icon'></span></Button></p>
      <p>added by {blog.author}</p>
      <h4>Comments</h4>
      { blog.comments && <><ul>{blog.comments.map(comment => <li key={comment}>{comment}</li>)}</ul></> }
      <form onSubmit={handleSubmit}>
        <input type='text' placeholder="write a comment" value={input} onChange={(e) => setInput(e.target.value)}/>
        <Button type='submit'>Add</Button>
      </form>
    </>
  )
}

export default BlogDetail