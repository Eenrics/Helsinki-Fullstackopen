const BlogForm = ({handleBlog, form, setForm}) => {
    return ( 
        <form onSubmit={handleBlog}>
        <h2>Create new</h2>
        Title: <input name='title' value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} placeholder="title" type="text"/><br/>
        Author: <input name='author' value={form.author} onChange={(e) => setForm({...form, author: e.target.value})} placeholder="author" type="text"/><br/>
        Url: <input name='url' value={form.url} onChange={(e) => setForm({...form, url: e.target.value})} placeholder="url" type="text"/><br/>
        <button type='submit'>create</button>
      </form>
     );
}
 
export default BlogForm;