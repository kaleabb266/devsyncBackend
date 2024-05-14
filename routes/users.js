const express = require('express');
const mongoose = require('mongoose')

const router = express.Router()



const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    username: String,
    password: String,
    techStacks: {},
    rating: Number,
    email: String,
    github: String,
    date: { type: Date, default: Date.now }

})


const User = mongoose.model('User', userSchema)




router.get('/', async (req, res) => {
    const users = await User.find().sort('name')
    res.send(users)

})



router.post('/', async (req, res) => {
    let user = new User({
        "firstname": req.body.firstname,
        "lastname": req.body.lastname,
        "username": req.body.username,
        "password": req.body.password,
        "techStacks": req.body.techStacks,
        "rating": req.body.rating,
        "email": req.body.email,
        "github": req.body.github,

    })

    user = await user.save()
    res.send(user)
})




module.exports = router;