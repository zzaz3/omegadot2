const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

// Import Account Model
require('../models/Account');
const Account = mongoose.model('account');

router.get('/accounts', (req, res) => {
  Account.find()
    .then(accounts => {
      res.json(accounts);
    });
});

// Save New Account to Database
router.post('/account/add', (req, res, next) => {
  let errors = [];

  if(!req.body.number)
    errors.push({text: 'Missing Account Number'});

  if(errors.length > 0){
    res.send({
      errors: errors
    })
  }

  next();

  // Create Account
  const account = new Account({
    name: req.body.name,
    number: req.body.number,
    type: req.body.type,
    subtype: req.body.subtype,
    balance: req.body.initBalance,
    isActive: req.body.isActive
  });
  // Save Account to Database
  account.save((err) => {
    if (err)
<<<<<<< HEAD
      console.log('ERROR...COULD NOT SAVE ACCOUNT');
    res.status(201).json(account);
=======
      console.log('ERROR...COULD NOT SAVE TO DATABASE');
    else
      res.status(201).json(account);
>>>>>>> 143c5bfc8f4b56089f2c1d1e662ae6a30139c2a9
  });
});

module.exports = router;
