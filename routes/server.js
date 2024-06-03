const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { route } = require('./quiz');
// const { route } = require('./quiz');
// require('dotenv').config();

const app = express();
const router = express.Router()

app.use(express.json());
app.use(cors({ origin: true }));

router.post('/', async (req, res) => {
  const { username, secret } = req.body;

  try {
    console.log("// Fetch user information from Chat Engine")
    const response = await axios.get('https://api.chatengine.io/users/me/', {
      headers: {
        'Project-ID': process.env.CHAT_ENGINE_PROJECT_ID,
        'User-Name': username,
        'User-Secret': secret,
      },
    });

    // If successful, respond with user data
    if (response.status === 200) {
      const user = response.data;
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

// Server listening on port 3001
app.listen(3001, () => {
  console.log('Server running on port 3001');
});
module.exports = router;