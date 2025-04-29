import React from 'react';
import { Link } from 'react-router-dom';


const Login = () => {
  return (
    <div className="auth-container">
      <div className="auth-left">
        <h1>Discover Ancient Tamil</h1>
        <ul>
          <li>Unlock the wisdom of ancient literature and philosophy</li>
          <li>Understand Sangam poetry and ancient scripts</li>
          <li> Improve memory through classical language learning</li>
          <li> Appreciate rich cultural heritage and history</li>
          <li> Contribute to language preservation globally</li>
        </ul>
      </div>
      <div className="auth-right">
        <h2>Login</h2>
        <form>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Sign In</button>
          <p className="redirect-text">
            Don’t have an account? <Link to="/signup">Create one</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
