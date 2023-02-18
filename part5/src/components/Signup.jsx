const Signup = ({handleSignup, signup, setSignup}) => {
    return ( 
        <form onSubmit={handleSignup}>
        <h2>Sign Up</h2>
        Name: <input name='name' value={signup.name} onChange={(e) => setSignup({...signup, name: e.target.value})} placeholder="name" type="text"/><br/>
        Username: <input name='username' value={signup.username} onChange={(e) => setSignup({...signup, username: e.target.value})} placeholder="username" type="text"/><br/>
        Password: <input name='password' value={signup.passowrd} onChange={(e) => setSignup({...signup, passowrd: e.target.value})} placeholder="password" type="password"/><br/>
        Password: <input name='password' value={signup.confpassword} onChange={(e) => setSignup({...signup, confpassword: e.target.value})} placeholder="confirm password" type="password"/><br/>
        <button type='submit'>Sign up</button>
      </form>
     );
}
 
export default Signup;