const Login = ({ handleLogin, username, password, handleUsername, handlePassword }) => {
  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
        Username: <input id='username' name='username' value={username} onChange={handleUsername} placeholder='username' type='text'/><br/>
        Password: <input id='password' name='password' value={password} onChange={handlePassword} placeholder='password' type='password'/><br/>
      <button className='login-btn' type='submit'>Log in</button>
    </form>
  )
}

export default Login