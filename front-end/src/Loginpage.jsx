import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Loginpage = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [user, setUser] = useState('');

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/login', loginData);
      
      console.log('Server response:', response.data); // Log the entire response

      const { success, message } = response.data;
      if (success) {
        console.log('Login successful');
        setUser(loginData.username); // Save the username
        setLoginSuccess(true); // Set login success to true
      } else {
        console.log(message);
        setLoginSuccess(false);
      }
    } catch (error) {
      console.log('Login Error', error);
      setLoginSuccess(false);
    }

    // Reset login data
    setLoginData({
      username: '',
      password: ''
    });
  };

  return (
    <div>
      <h1>Login Page</h1>
      {loginSuccess ? (
        <h2>Welcome, {user}!</h2>
      ) : (
        <form onSubmit={handleLoginSubmit}>
          <input
            type="text"
            onChange={handleLoginChange}
            name="username"
            placeholder="Username"
            required
            value={loginData.username}
          />
          <input
            type="password"
            onChange={handleLoginChange}
            name="password"
            placeholder="Password"
            required
            value={loginData.password}
          />
          <button type="submit">Login</button>
          <p>
            Not Registered Yet? <Link to="/register">Register</Link>
          </p>
        </form>
      )}
    </div>
  );
};

export default Loginpage;
