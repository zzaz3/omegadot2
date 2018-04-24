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

// Find The Specified Account Using URL Params
router.get('/account/:routeName', (req, res) => {
  Account.findOne({routeName: req.params.routeName})
    .then(account => {
      res.json(account);
    });
});

// Find All Expense Accounts
router.get('/accounts/expense', (req, res) => {
  Account.find({type: "expense"})
    .then(accounts => res.json(accounts));
})

// Find The Specified Account And Update
router.put('/account/:name', (req, res) => {
  Account.findOneAndUpdate({name: req.params.name}, {$inc: req.body})
    .then(() => {
      Account.findOne({name: req.params.name})
        .then(() => res.send(Account));
    });
});

// Save New Account to Database
router.post('/account/add', (req, res) => {
  let errors = [];

  if(!req.body.number)
    errors.push({text: 'Missing Account Number'});

  if(errors.length > 0){
    res.send({
      errors: errors
    })
  }
  // Create Account
  const account = new Account({
    name: req.body.name,
    number: req.body.number,
    type: req.body.type,
    subtype: req.body.subtype,
    balance: req.body.initBalance,
    isActive: req.body.isActive,
    routeName: req.body.routeName
  });
  // Save Account to Database
  account.save((err) => {
    if (err)
      console.log('ERROR...COULD NOT SAVE ACCOUNT');
    else
      res.status(201).json(account);
  });
});

router.put('/accounts/balance/update/:id', (req, res) => {
  Account.findByIdAndUpdate({_id: req.params.id}, {$inc: req.body})
      .then(() => {
          Account.findOne({_id: req.params.id}).then(() => {
              res.send(Account);
          });
      });
});

module.exports = router;
