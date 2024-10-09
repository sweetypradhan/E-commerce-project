import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link for navigation
import './Signup.css'; // Import the CSS file for styling

const Signup = () => {
  // State variables to hold user input
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();   // Prevent the default form submission behavior
    
    console.log('Full Name:', fullName);
    console.log('Email:', email);
    console.log('Password:', password);
    
    // Send a POST request to the server to register the user
    const response = fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
    },
      body: JSON.stringify({     // Convert the input data to JSON format
          fullName: fullName, 
          email: email,
          password: password,
      }),
  });
  // Convert the input data to JSON format
  const result = response.then((data) => data.json());
  result.then((data) => console.log(data))
  navigate('/');
  };

  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
       
      <form onSubmit={handleSubmit} className="signup-form">   
        <label htmlFor="fullName">Full Name</label>
        <input
          type="text"
          id="fullName"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}   // Update state on input change
          required
        />
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
        <button type="submit">Sign Up</button>
      </form>
      <div className="login-link">
        <p>Already have an account?</p>
        <Link to="/" className="login-button">Login</Link>
      </div>
    </div>
  );
};

export default Signup;
