const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var cors = require('cors');

const User = require('./models/User');

const server = express();

server.use(cors());


// Load passport
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
// Setup passport
server.use(passport.initialize());
server.use(passport.session());
// Configure Passport
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Load Routes
const test = require('./api/test');
const accountList = require('./api/accountList');
const accounts = require('./api/accounts');
const auth = require('./api/auth');

// Body Parser Middleware
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

//Import DB Config
const database = require('./config/database');
// Connect to Mongoose
mongoose.connect(database.mongoURI);

// Use Routes
server.use('/', test);
server.use('/', accountList);
server.use('/', accounts);
server.use('/auth/', auth);

const port = 5000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`)
});
