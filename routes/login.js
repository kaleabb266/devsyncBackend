var axios = require('axios');
const express = require('express');


const router = express.Router()



const project_id = 'b1bf20c2-8b80-4ff1-b59f-ead732360b40';
const projectSecret = '8bf476cd-6524-45a7-9ece-bc47a5a0c812';



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