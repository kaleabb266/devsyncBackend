const express = require('express');
const mongoose = require('mongoose')

const router = express.Router()



const adminSchema = new mongoose.Schema({
    name: String,
    password: String,
    
    
    })


    


const Admin = mongoose.model('Admin', adminSchema)




router.get('/', async (req, res) => {
    const admins = await Admin.find({name :"kaleabz",
        password :"@Kaleab1234"})
    console.log(admins)
    res.send(admins)
    console.log(admins.language)

})



router.post('/', async (req, res) => {
    let admin = new Admin({
        "name": req.body.name,
        "password": req.body.password,
    
    })

    admin = await admin.save()
    res.send(admin)
})

// router.delete('/:questionId', async (req, res) => {
//     const questionId = req.params; 
//     console.log("questionId",res.params)
  
//     try {
//       const deletedQuestion = await Quiz.findByIdAndDelete(questionId);
  
//       if (!deletedQuestion) {
//         return res.status(404).send({ message: 'Question not found' });
//       }
  
//       res.send({ message: 'Question deleted successfully' });
//     } catch (error) {
//       console.error(error);
//       res.status(500).send({ message: 'Error deleting question' });
//     }
//   });


module.exports = router;