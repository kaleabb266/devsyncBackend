const express = require('express');
const mongoose = require('mongoose')

const router = express.Router()

// const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // Customize fields as needed
  password: { type: String, required: true }, // Implement secure password hashing
  email: { type: String, required: true, unique: true },
  // Add other relevant fields for user data
});
const User = mongoose.model('User', userSchema); // Create the model


const reporteduserSchema = new mongoose.Schema({
    username: String,
    reortedby: String,
    description: String,
    chat: [],
    date: { type: Date, default: Date.now }

})


const reportedUser = mongoose.model('reportedUser', reporteduserSchema)




router.get('/', async (req, res) => {
    const reportedUsers = await reportedUser.find().sort('date')
    res.send(reportedUsers)

})



router.post('/', async (req, res) => {
    let reportedUsers = new reportedUser({
        "username": req.body.username,
        "reortedby": req.body.reortedby,
        "description": req.body.description,
        "chat": req.body.chat,
        

    })

    reportedUsers = await reportedUsers.save()
    res.send(reportedUsers)
})




module.exports = router;