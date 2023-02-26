import {
  Link } from 'react-router-dom'

const UserList = ({ users }) => {

  if (!users) return null
  return (
    <table  className="usertable">
      <thead>
        <tr>
          <th>Users</th><th>blogs created</th>
        </tr>
      </thead>
      <tbody>
        { users.map(user => <tr key={user.id}><td><Link to={`/users/${user.id}`}>{user.name}</Link></td><td>{user.blogs.length}</td></tr>) }
      </tbody>
    </table>
  )
}

export default UserList