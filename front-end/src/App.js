import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Loginpage from './Loginpage';
import Registrationpage from './Registrationpage';

const Home = () => (
  <div>
    <h1>Welcome to the App</h1>
    <div style={{ marginBottom: '20px' }}>
      <Link to="/login">
        <button>Go to Login</button>
      </Link>
      <Link to="/register" style={{ marginLeft: '10px' }}>
        <button>Go to Register</button>
      </Link>
    </div>
  </div>
);

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home route */}
        <Route path="login" element={<Loginpage />} />
        <Route path="register" element={<Registrationpage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
