var axios = require('axios');
const express = require('express');


const router = express.Router();



const project_id = 'b7fa4655-c0a7-4b26-8d55-0e2a6f3af468';
const projectSecret = '890b3659-56bb-4bc6-bfb1-865c706fc1b3';


router.post('/', async (req, res) => {
    var data = '{\n    "title": "Surprise Party",\n    "is_direct_chat": false\n}';

    var config = {
      method: 'post',
    maxBodyLength: Infinity,
      url: 'https://api.chatengine.io/chats/',
      headers: { 
        'Project-ID': project_id, 
        'User-Name': 'ayu', 
        'User-Secret': '123456'
      },
      data : req.body
      
    };

    console.log(req.body)
    
    axios(config)
    .then(function (response) {
        res.send(response.data)
    //   console.log(JSON.stringify(response.data));

    })
    .catch(function (error) {
      console.log(error);
    });
    

    
})

module.exports = router;