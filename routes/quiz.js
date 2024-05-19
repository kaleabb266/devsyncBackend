const express = require('express');
const mongoose = require('mongoose')

const router = express.Router()



const quizSchema = new mongoose.Schema({
    language: String,
    category: String,
    question: [],
    choices: [[]],
    correctAnswerIndex: [],
    
    })

    // const questionsD = [
    //     {
    //       language: "JavaScript",
    //       category: "Basics",
    //       question: [
    //         "What data type is used to store a single character in JavaScript?",
    //         "What method is used to select elements by ID in JavaScript?",
    //       ],
    //       choices: [
    //         ["int", "float", "string", "char"],
    //         ["getElementById()", "querySelector()", "getElementByClassName()", "getElementByTagName()"],
    //       ],
    //       correctAnswerIndex: [2, 0],
    //     }


const Quiz = mongoose.model('Quiz', quizSchema)




router.get('/', async (req, res) => {
    const quizs = await Quiz.find()
    res.send(quizs)

})



router.post('/', async (req, res) => {
    let quiz = new Quiz({
        "language": req.body.language,
        "category": req.body.category,
        "question": req.body.question,
        "choices": req.body.choices,
        "correctAnswerIndex": req.body.correctAnswerIndex

    })

    quiz = await quiz.save()
    res.send(quiz)
})




module.exports = router;