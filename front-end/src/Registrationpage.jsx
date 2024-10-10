import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Registrationpage = () => {
  const [registrationData, setRegistrationData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegistrationChange = (e) => {
    const { name, value } = e.target;
    setRegistrationData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/register', registrationData);
      setSuccess('Registration successful!'); // Success message
      setError(''); // Clear error message if registration succeeds
      setRegistrationData({
        username: '',
        password: ''
      });
    } catch (err) {
      setError('Registration failed: ' + (err.response?.data?.message || err.message)); // Set error message
      setSuccess(''); // Clear success message if registration fails
    }
  };

  return (
    <div>
      <h1>Registration Form</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
      {success && <p style={{ color: 'green' }}>{success}</p>} {/* Display success message */}
      <form onSubmit={handleRegistrationSubmit}>
        <input
          type="text"
          onChange={handleRegistrationChange}
          name="username"
          placeholder="Username"
          required
          value={registrationData.username}
        />
        <input
          type="password"
          onChange={handleRegistrationChange}
          name="password"
          placeholder="Password"
          required
          value={registrationData.password}
        />
        <button type="submit">Register</button>
        <p>
          Already registered? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Registrationpage;
