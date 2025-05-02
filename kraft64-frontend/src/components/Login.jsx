import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      alert(data.msg);
      if (res.ok) {
        // Optional: store user in localStorage
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/student-dashboard'); // or wherever you want to go
      }
    } catch (err) {
      console.error(err);
      alert('Login failed');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-left"></div>
      <div className="auth-right">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
          <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
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
