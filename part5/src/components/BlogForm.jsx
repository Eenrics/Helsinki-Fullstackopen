import { useState } from 'react'

const BlogForm = ({ handleBlog }) => {
  const [form, setForm] = useState({ title: '', author: '', url: '' })

  const createBlog = (event) => {
    event.preventDefault()
    handleBlog(form)
    setForm({ title: '', author: '', url: '' })
  }

  return (
    <form onSubmit={createBlog}>
      <h2>Create new</h2>
        Title: <input className='blog-ttl' name='title' value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder='title' type='text'/><br/>
        Author: <input className='blog-ath' name='author' value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} placeholder='author' type='text'/><br/>
        Url: <input className='blog-url' name='url' value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} placeholder='url' type='text'/><br/>
      <button className='blog-creat-btn' type='submit'>create</button>
    </form>
  )
}

export default BlogForm