const express = require('express');
const mongoose = require('mongoose');

const { Date } = mongoose.Schema.Types;

const router = express.Router()



const reportedUserSchema = new mongoose.Schema({
    reporeduser: String,
    reportedby: String,
    description: String,
    group: String,
    date: {
        type: Date,
        default: Date.now
      }
    
    })


    


const reportedUser = mongoose.model('reportedUser', reportedUserSchema)




router.get('/', async (req, res) => {
    const reportedUsers = await reportedUser.find()
    res.send(reportedUsers)
    console.log(reportedUsers.reporeduser)

})



router.post('/', async (req, res) => {
    let reporteduser = new reportedUser({
        "reporeduser": req.body.reporeduser,
        "reportedby": req.body.reportedby,
        "description": req.body.description,
        "group": req.body.group,

    })

    reporteduser = await reporteduser.save()
    res.send(reporteduser)
})

router.delete('/:Id', async (req, res) => {
    const Id = req.params.Id; 
      console.log("Id",Id)
    
      try {
        const removedReport = await reportedUser.findByIdAndDelete(Id);
        console.log(removedReport)
        res.send({ message: 'Question deleted successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error deleting question' });
      }
    });


module.exports = router;

