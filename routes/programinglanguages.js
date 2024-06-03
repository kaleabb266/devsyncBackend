// // server.js
// const express = require('express');
// const bodyParser = require('body-parser');
// const app = express();
// const port = 3000;

// // Middleware to parse JSON bodies
// app.use(bodyParser.json());

// // Sample data of programming languages
// let programmingLanguages = [
//   { id: 1, name: 'JavaScript' },
//   { id: 2, name: 'Python' },
//   { id: 3, name: 'Java' },
//   { id: 4, name: 'C#' },
//   { id: 5, name: 'Ruby' }
// ];

// // Route to get the list of programming languages
// app.get('/', (req, res) => {
//   res.json(programmingLanguages);
// });

// // Route to add a new programming language
// app.post('/', (req, res) => {
//   const  name = req.body;
//   if (!name) {
//     return res.status(400).json({ error: 'Name is required' });
//   }

//   const newLanguage = {
//     id: programmingLanguages.length + 1,
//     name
//   };

//   programmingLanguages.push(newLanguage);
//   res.status(201).json(newLanguage);
// });

// // Start the server
// app.listen(port, () => {
//   console.log("Server is running on http://localhost:${port}");
// });