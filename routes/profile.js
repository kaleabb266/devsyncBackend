const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const router = express.Router();
router.use(bodyParser.json());

// Define Profile model based on the schema
const profileSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    username: String,
    email: String,
    github: String,
    techStacks: { 
      type: Map, 
      of: Number 
    },
    averageRating: { type: Number, default: 0 }, 
    ratingCount: { type: Number, default: 0 } 
  });

const Profile = mongoose.model('Profile', profileSchema);


// Route to create a new profile
router.post('/', async (req, res) => {
    try {
      const { firstName, lastName, username, email, github, techStacks, correctAnswerIndex } = req.body;
  
      // Initialize techStacks Map with scores set to 0 for all selected tech stacks
      const initializedTechStacks = new Map();
      // Loop through each tech stack received from the form
      techStacks.forEach(stack => {
        // Set the score for each tech stack to 0
        initializedTechStacks.set(stack, 0);
      });
  
      const profile = new Profile({
        firstName,
        lastName,
        username,
        email,
        github,
        techStacks: initializedTechStacks,
      });
  
      const savedProfile = await profile.save();
      res.status(201).send(savedProfile);
    } catch (error) {
      console.error('Error creating profile:', error);
      res.status(500).send('Error creating profile');
    }
  });
  
  

// Route to get all profiles
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.status(200).send(profiles);
  } catch (error) {
    console.error('Error fetching profiles:', error);
    res.status(500).send('Error fetching profiles');
  }
});

router.get('/search', async (req, res) => {
  try {
    const { username } = req.query;
    console.log(username)
    const profile = await Profile.findOne({username});
    if (!profile) {
      return res.status(404).send('Profile not found');
    }
    res.status(200).send(profile);
  } catch (error) {
    console.error('Error fetching profile by username:', error);
    res.status(500).send('Error fetching profile by username');
  }
});


// Route to update a profile's tech stack score by username
router.put('/updateScoreByUsername', async (req, res) => {
  try {
    const { username, techStack, newScore } = req.body;
    console.log("the new score is : ",newScore)
    const profile = await Profile.findOne({ username });
    if (!profile) {
      return res.status(404).send('Profile not found');
    }

    // Update the score for the specified tech stack
    profile.techStacks.set(techStack, newScore);

    await profile.save();
    res.send(profile);
  } catch (error) {
    console.error('Error updating score:', error);
    res.status(500).send('Error updating score');
  }
});

router.put('/rating', async (req, res) => {
  const { username, rating } = req.body;

  try {
    const ratedUserProfile = await Profile.findOne({ username });
    if (ratedUserProfile) {
      const newCount = ratedUserProfile.ratingCount + 1;
      const newAverage = ((ratedUserProfile.averageRating * ratedUserProfile.ratingCount) + rating) / newCount;
      ratedUserProfile.averageRating = newAverage;
      ratedUserProfile.ratingCount = newCount;
      await ratedUserProfile.save();
    }

    res.status(200).send({ message: 'Rating submitted successfully' });
  } catch (error) {
    console.error('Error submitting rating:', error);
    res.status(500).send('Error submitting rating');
  }
});


module.exports = router;
