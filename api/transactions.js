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

router.get('/transactions/pending', (req, res) => {
    Transaction.find({
      status: 'pending'  
    }).then(transactions => {
        res.json(transactions);
    });
});

router.post('/transaction/add', (req, res) => {
    // Create Transaction
    const transaction = new Transaction({
        debitAccount: req.body.debitAccount,
        debitAmount: req.body.debitAmount,
        debitRefNum: req.body.debitRefNum,
        creditAccount: req.body.creditAccount,
        creditAmount: req.body.creditAmount,
        creditRefNum: req.body.creditRefNum,
        description: req.body.description,
        date: req.body.date,
        status: req.body.status
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