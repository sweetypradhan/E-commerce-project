import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link for navigation
import './Login.css'; // Import the CSS file for styling

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
   
//     console.log('Email:', email);
//     console.log('Password:', password);
//     const response = fetch("http://localhost:5000/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//     },
//       body: JSON.stringify({
//           email: email,
//           password: password,
//       }),
//   });

//   const result = response.then((data) => data.json());
//   result.then((data) => {
//     console.log(data)
//     localStorage.setItem('accessToken', data.accessToken);
//   })
  
//   navigate('/');
//   };


const handleSubmit = async (e) => {
  e.preventDefault();
  
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

  if (response.ok) {
    const data = await response.json();
    localStorage.setItem('accessToken', data.accessToken);
    navigate('/'); // Navigate only after successful login
  } else {
    const errorData = await response.json();
    console.error('Login failed:', errorData);
    // Optionally show an error message to the user
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




// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import './Login.css';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     console.log('Email:', email);
//     console.log('Password:', password);
    
//     try {
//       const response = await fetch("http://localhost:5000/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();
//       console.log(data);

//       if (response.ok) {
//         // Store the access token in localStorage
//         localStorage.setItem('accessToken', data.token);
//         navigate('/'); // Redirect to home or another page after successful login
//       } else {
//         console.error('Login failed:', data.message);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <div className="login-container">
//       <h1>Login</h1>
//       <form onSubmit={handleSubmit} className="login-form">
//         <label htmlFor="email">Email</label>
//         <input
//           type="email"
//           id="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <label htmlFor="password">Password</label>
//         <input
//           type="password"
//           id="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button type="submit">Login</button>
//       </form>
//       <div className="signup-link">
//         <p>Don't have an account?</p>
//         <Link to="/Signup" className="signup-button">Sign Up</Link>
//       </div>
//     </div>
//   );
// };

// export default Login;
