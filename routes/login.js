var axios = require('axios');
const express = require('express');


const router = express.Router()



const project_id = 'b7fa4655-c0a7-4b26-8d55-0e2a6f3af468';
const projectSecret = '890b3659-56bb-4bc6-bfb1-865c706fc1b3';






router.post('/', async (req, res) => {
    console.log(req.body.username)
    var config = {
        method: 'get',
      maxBodyLength: Infinity,
        url: 'https://api.chatengine.io/users/me/',
        headers: { 
          'Project-ID': project_id, 
          'User-Name': req.body.username, 
          'User-Secret': req.body.password
        }
      };


      axios(config)
        .then(function (response) {
        res.send(response)
        
        })
        .catch(function (error) {
        console.log(error);
        });
    

    
})


module.exports = router;