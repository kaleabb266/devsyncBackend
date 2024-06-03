const express = require('express');
const mongoose = require('mongoose')

const router = express.Router()



const profileSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    username: String,
    techStacks: {},
    rating: {},
    correctAnswerIndex: [],
    email: String,
    github: String,
    
    })

    


const Profile = mongoose.model('Profie', profileSchema)




router.get('/', async (req, res) => {
    const profiles = await profile.find()
    res.send(profile)

})



router.post('/', async (req, res) => {
    let profie = new Profile({
        "firstname": req.body.firstname,
        "lastname": req.body.lastname,
        "username": req.body.username,
        "techStacks": req.body.techStacks,
        "rating": req.body.rating,
        "email": req.body.email,
        "github": req.body.github,

    })

    quiz = await quiz.save()
    res.send(quiz)
})




module.exports = router;