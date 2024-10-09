import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link for navigation
import './Login.css'; // Import the CSS file for styling

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


const handleSubmit = async (e) => {
  e.preventDefault();
      console.log('Email:', email);
      console.log('Password:', password);

  try {
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    // Check the status of the response
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Login failed:', errorData);
      alert('Invalid email or password. Please try again.'); // Alert for invalid login
      return; // Early return if login failed
    }

    // Parse the successful response
    const data = await response.json();
    console.log('Login success:', data); // Log the successful response
    localStorage.setItem('accessToken', data.accessToken);
    navigate('/Home'); // Navigate only after successful login
  } catch (error) {
    console.error('Error during login:', error);
    alert('An error occurred during login. Please try again later.'); // Alert for network errors
  }
};

return (
      <div className="login-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        <div className="signup-link">
          <p>Don't have an account?</p>
          <Link to="/Signup" className="signup-button">Sign Up</Link>
        </div>
      </div>
    );
  };
  
  export default Login;
  




