const express = require("express");
const mongoose = require('mongoose')
const cors = require("cors");
const bcrypt = require('bcrypt'); // Added for password hashing

const app = express();
app.use(express.json());
app.use(cors({ origin: true })); // Adjust origin for production

// Models (assuming you have a User model defined)
const User = require('./models/User'); // Replace with your user model path

// Login route
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  // Basic validation (can be improved)
  if (!username || !password) {
    return res.status(400).send({ message: "Username and password are required." });
  }

  try {
    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).send({ message: "Invalid username or password." });
    }

    // Compare hashed password (assuming password is hashed in your model)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ message: "Invalid username or password." });
    }

    // Login successful (send relevant user data)
    res.send({
      username: user.username, // Adjust based on your user model data
      // Other user data you want to send to the frontend
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error." });
  }
});

// ... other routes and server setup

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/devsync')
  .then(() => console.log('connected to mongod'))
  .catch(err => console.error('connection to db failed', err))

app.listen(3001, () => console.log("listening on port 3001"));











