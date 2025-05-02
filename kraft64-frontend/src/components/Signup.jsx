import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      alert(data.msg);
      if (res.ok) navigate('/login');
    } catch (err) {
      console.error(err);
      alert('Signup failed');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-left"></div>
      <div className="auth-right">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="fullName" placeholder="Full Name" required onChange={handleChange} />
          <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
          <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
          <button type="submit">Create Account</button>
          <p className="redirect-text">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
