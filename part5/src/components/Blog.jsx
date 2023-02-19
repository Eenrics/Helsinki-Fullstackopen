import { useState } from 'react'

const Blog = ({ blog, username, handleDelete, handleLike }) => {

  const [innerToogle, SetinTog] = useState(false)

  const detail = <div className='views'>
    <p><span className='title'>Title: </span>{blog.title}</p>
    <p><span className='title'>Author: </span>{blog.author}</p>
    <p><span className='title'>Url: </span>{blog.url}</p>
    <p><span className='title'>Likes: </span>{blog.likes}
      <button className='like' onClick={() => handleLike(blog.id, blog.likes + 1)}>like<span className='icon'></span></button>
    </p>
    <span className='user'>{blog.user ? blog.user.name : null} </span>
  </div>

  return (
    <div className='bloglist' >
      {blog.title} {blog.author}
      {
        (blog.user && (username === blog.user.username)) ?
          <button className='blogdel' onClick={() => handleDelete(blog.id, blog.title)}>delete</button> :
          null
      }
      <button className='viewhide' onClick={() => SetinTog(!innerToogle)}>{innerToogle ? 'hide' : 'view'}</button>

      {
        innerToogle ? detail : null
      }
    </div>
  )
}

export default Blog