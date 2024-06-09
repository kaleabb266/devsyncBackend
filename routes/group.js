var axios = require('axios');
const express = require('express');


const router = express.Router();



const project_id = 'b1bf20c2-8b80-4ff1-b59f-ead732360b40';
const projectSecret = '8bf476cd-6524-45a7-9ece-bc47a5a0c812';


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