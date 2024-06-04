const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const axios = require("axios");
const bcrypt = require('bcrypt'); // Added for password hashing

const app = express();
app.use(express.json());
app.use(cors({ origin: true })); // Adjust origin for production

const projectId = 'b7fa4655-c0a7-4b26-8d55-0e2a6f3af468';
const projectSecret = '890b3659-56bb-4bc6-bfb1-865c706fc1b3';

// Models (assuming you have a User model defined)
const User = require('./models/User'); // Replace with your user model path

// Login route
app.post("/api/login", async (req, res) => {
    const { username, password } = req.body;
    console.log(username)

    try {
        console.log("user search")
        // Fetch user information from Chat Engine
        const response = await axios.get("https://api.chatengine.io/users/me",
            {
                headers: {
                    "Private-Key": projectSecret,
                    "Content-Type": "application/json"
                },
                params: { username, secret: password }
            }
        );
        console.log("HJDKSSSSSSSSSAFDKFJAHDLSFJDSKFJHDSKFHKSDFJDFSFDSFJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJ")
        console.log(response.data)
        console.log("HJDKSSSSSSSSSAFDKFJAHDLSFJDSKFJHDSKFHKSDFJDFSFDSFJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJ")

        // If successful, respond with user data
        // return respo nse.data
        if (response.data.username !== username || response.data.secret !== bcrypt.hash(password, salt)){
            return -1

        }

        if (response.status === 200) {
            const user = response.data;
            console.log(user)
            // Add any additional logic here, such as generating a session token, storing user data in a database, etc.
            return res.status(200).json({ user });
        } else {
            // Handle errors from Chat Engine API
            return res.status(response.status).json({ error: response.data.error });
        }
    } catch (error) {
        // Handle other errors
        console.error('Login error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// Connect to MongoDB
// mongoose.connect('mongodb://127.0.0.1:27017/devsync', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
//     .then(() => console.log('Connected to MongoDB'))
//     .catch(err => console.error('Connection to DB failed', err));

app.listen(3001, () => console.log("Listening on port 3001"));
