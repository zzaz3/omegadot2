const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

// Import Account Model
require('../models/Transaction');
const Transaction = mongoose.model('transaction');

router.get('/transactions', (req, res) => {
    Transaction.find()
     .then(transaction => {
         res.json(transaction);
     })
});

router.post('/transaction/add', (req, res) => {
    // Create Transaction
    const transaction = new Transaction({
        debitAccount: req.body.debitAccount,
        debitAmount: req.body.debitAmount,
        creditAccount: req.body.creditAccount,
        creditAmount: req.body.creditAmount,
        description: req.body.description,
        date: req.body.date
    });
    // Save Transaction to Database
    transaction.save((err) => {
        if(err){
            console.log('ERROR...COULD NOT SAVE TRANSACTION');
            res.status(201).json(transaction);
        }
    });
});

module.exports = router;