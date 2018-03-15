const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

// Import Account Model
require('../models/Log');
const Log = mongoose.model('log');

// GET to /log
router.get('/log', (req, res) => {
  Log.find()
    .then(log => {
      res.json(log);
    });
});

// POST to /log
router.post('/log', (req, res) => {
  // Create a new user object from the req's JSON.
  const newLog = Log({
    name: req.body.name,
    time: req.body.time,
    type: req.body.type,
    changedBy: req.body.changedBy,
    beforeValue: req.body.beforeValue,
    afterValue: req.body.afterValue,
  });

  newLog.save((err) => {
    if (err)
      console.log('ERROR...COULD NOT SAVE TO DATABASE');
    else
      res.status(201).json(newLog);
  });
});

module.exports = router;
