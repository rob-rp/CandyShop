'use strict';

const express = require('express');
const cors = require('cors')
const db = require('./queries')

const app = express();
const port = 8000;

// Middleware
app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
  res.send('Candy API server is operational!');
});



app.get('/candies', db.getAllCandies);
app.get('/candies/:id', db.getCandyById);
app.put('/candies/:id', db.updateCandy);



app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
