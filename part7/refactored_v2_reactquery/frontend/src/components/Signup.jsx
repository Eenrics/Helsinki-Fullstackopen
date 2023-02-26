const Signup = ({ handleSignup, signup, setSignup }) => {
  return (
    <form onSubmit={handleSignup}>
      <h2>Sign Up</h2>
        Name: <input className='signup-name' name='name' value={signup.name} onChange={(e) => setSignup({ ...signup, name: e.target.value })} placeholder='name' type='text'/><br/>
        Username: <input className='signup-uname' name='username' value={signup.username} onChange={(e) => setSignup({ ...signup, username: e.target.value })} placeholder='username' type='text'/><br/>
        Password: <input className='signup-pass' name='password' value={signup.passowrd} onChange={(e) => setSignup({ ...signup, passowrd: e.target.value })} placeholder='password' type='password'/><br/>
        Password: <input className='signup-cpass' name='password' value={signup.confpassword} onChange={(e) => setSignup({ ...signup, confpassword: e.target.value })} placeholder='confirm password' type='password'/><br/>
      <button className='signup-btn' type='submit'>Sign up</button>
    </form>
  )
}

export default Signup