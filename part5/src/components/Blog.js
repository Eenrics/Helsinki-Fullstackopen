const Blog = ({blog, username, handleDelete}) => (
  <div className="bloglist">
    {blog.title} {blog.author} {(blog.user && (username === blog.user.username)) ? <button className="blogdel" onClick={() => handleDelete(blog.id, blog.title)}>delete</button> : null}
  </div>  
)

export default Blog