import React from 'react';
import { Link } from 'react-router-dom';


const Signup = () => {
  return (
    <div className="auth-container">
      <div className="auth-left">
      {/* <h1>பண்டைய தமிழை அறியுங்கள்</h1>
      <br></br>
        <ul>
          <li><h5>Unlock the wisdom of ancient literature and philosophy</h5></li>
          <li><h5>பண்டைய இலக்கியம் மற்றும் தத்துவத்தின் ஞானத்தை திறக்குங்கள்</h5></li>
          <li><h5> Improve memory through classical language learning</h5></li>
          <li><h5> செம்மொழி கற்றலால் நினைவாற்றலை மேம்படுத்துங்கள்</h5></li>
          <li> <h5>Contribute to language preservation globally</h5></li>
          <li><h5>உலகளாவிய மொழி பாதுகாப்பில் பங்களிக்குங்கள்</h5></li>
        </ul> */}
      </div>
      <div className="auth-right">
        <h2>Sign Up</h2>
        <form>
          <input type="text" placeholder="Full Name" required />
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
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
