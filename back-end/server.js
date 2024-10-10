const express = require('express');
const app = express();
const port = 8000;
const connectDB = require('./db/dbConnection'); // Import your database connection
const User = require('./db/user'); // Import your User model
const cors = require('cors');

// Middleware
app.use(express.json());
app.use(cors());

// Registration route
app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ success: true, message: 'Registration Successful' });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ success: false, message: 'Registration failed' });
  }
});

// Login route
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid Username or Password' });
    }
    if (user.password !== password) {
      return res.status(401).json({ success: false, message: 'Invalid username and password' });
    }
    res.status(200).json({ success: true, message: 'Login Successful' });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, message: 'Login failed' });
  }
});

// Start server
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}).catch((error) => {
  console.error('Failed to connect to the database:', error);
});
