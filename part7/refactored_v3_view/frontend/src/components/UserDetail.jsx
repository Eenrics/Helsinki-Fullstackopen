const UserDetail = ({ user }) => {

  if (!user) return <p>User not found!</p>
  return (
    <>
      <h2>{user.name}</h2>
      <p style={{ fontWeight: 'bolder', fontSize: '1.2rem' }}>added blogs</p>
      <ul>
        {user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
      </ul>
    </>
  )
}

export default UserDetail