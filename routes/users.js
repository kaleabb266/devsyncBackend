// const express = require('express');
// const mongoose = require('mongoose');

// // Assuming you have a User model and a ReportedUser model:
// const User = mongoose.model('./models/User'); // Replace with your user model
// const ReportedUser = mongoose.model('ReportedUser'); // Replace with your reported user model

// const router = express.Router();

// // Replace with your authentication middleware if needed
// router.get('/', async (req, res) => {
//   try {
//     // Fetch all reported users
//     const reportedUsers = await ReportedUser.find().populate('reportedBy', 'username'); // Populate reportedBy details

//     res.status(200).json(reportedUsers);
//   } catch (error) {
//     console.error('Error fetching reported users:', error);
//     res.status(500).json({ message: 'Internal server error' }); // Generic error message for security
//   }
// });

// module.exports = router;
