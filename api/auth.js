const express = require('express');
const passport = require('passport');
const User = require('../models/User.js');
import { roleAuth } from '../config/auth.js';

const router = express.Router();

// GET to /checksession
router.get('/checksession', roleAuth(['general', 'manager', 'admin']), (req, res) => {
  if (req.user) {
    return res.send(JSON.stringify(req.user));
  }
  return res.send(JSON.stringify({}));
});

// GET to /logout
router.get('/logout', (req, res) => {
  req.logout();
  return res.send(JSON.stringify(req.user));
});

// POST to /register
router.post('/register', (req, res) => {
  // Create a new user object from the req's JSON.
  const newUser = User({
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    role: req.body.role,
  });

  // Save new user into database using passport register method for security.
  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      return res.send(JSON.stringify({ error: err }));
    }
    return res.send(JSON.stringify(user));
  });
});

// POST to /login
router.post('/login', (req, res) => {
  passport.authenticate('local')(req, res, () => {
    if (req.user) {
      return res.send(JSON.stringify(req.user));
    }

    return res.send(JSON.stringify({ error: 'There was an issue logging in. Try again.' }));
  });
});

module.exports = router;
