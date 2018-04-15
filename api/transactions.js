const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

// Import Account Model
require('../models/Transaction');
const Transaction = mongoose.model('transaction');

// Retrieves All Transaction
router.get('/transactions', (req, res) => {
    Transaction.find()
     .then(transaction => {
         res.json(transaction);
     })
});

// Retrieves All Pending Transactions
router.get('/transactions/pending', (req, res) => {
    Transaction.find({
      status: 'pending'  
    }).then(transactions => {
        res.json(transactions);
    });
});

// Retreives All Approved Transactions
router.get('/transactions/approved', (req, res) => {
    Transaction.find({
        status: 'approved'
    }).then(transactions => {
        res.json(transactions);
    })
});

// Saves New Transaction To Database
router.post('/transaction/add', (req, res) => {
    const newTransaction = new Transaction({
        debitEntries: req.body.debitEntries
        // creditEntries: req.body.creditEntries,
        // date: req.body.date,
        // description: req.body.description,
        // status: req.body.state,
        // rejectReason: req.body.rejectReason
    });

    newTransaction.save((err) => {
        if(err){
            console.log('ERROR...COULD NOT SAVE TRANSACTION');
            res.status(201).json(newTransaction);
        }
    });
});

router.put('/transaction/status/update/:id', (req, res) => {
    Transaction.findByIdAndUpdate({_id: req.params.id}, req.body)
        .then(() => {
            Transaction.findOne({_id: req.params.id}).then(() => {
                res.send(Transaction);
            });
        });
});

module.exports = router;