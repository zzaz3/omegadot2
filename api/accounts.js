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
   // Create Account
    const account = new Account({
       name: req.body.name,
       number: req.body.number,
       category: req.body.category,
       balance: req.body.initBalance,
       isActive: req.body.isActive
   });
   // Save Account to Database
   account.save((err, member) => {
       if(err)
        console.log('ERROR...COULD NOT SAVE TO DATABASE');
        res.status(201).json(account);
   });
});

module.exports = router;