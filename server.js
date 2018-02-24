const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const server = express();

// Load Routes
const test = require('./api/test');

// Body Parser Middleware
server.use(bodyParser.urlencoded({extended: false}));
server.use(bodyParser.json());

//Import DB Config
const database = require('./config/database');
// Connect to Mongoose
mongoose.connect(database.mongoURI);

// Use Routes
server.use('/', test);

const port = 5000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`)
});