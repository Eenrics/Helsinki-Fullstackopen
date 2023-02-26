import {
  Link } from 'react-router-dom'

const Blog = ({ blog, username, handleDelete }) => {

  return (
    <div className='bloglist' >
      <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
      {
        (blog.user && (username === blog.user.username)) ?
          <button className='blogdel' onClick={() => handleDelete(blog.id, blog.title)}>delete</button> :
          null
      }
    </div>
  )
}

export default Blog