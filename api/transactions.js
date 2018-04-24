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

// Retrieves A Transaction By Id
router.get('/transaction/:id', (req, res) => {
    // Transaction.findById(req.params.id)
    //     .then(transaction => {
    //         res.json(transaction);
    //     });

    Transaction.findById(req.params.id)
        .then(transaction => {
            if(!transaction) {return res.status(404).end();}
            return res.status(200).json(transaction);
        })
        .catch(err => next(err));
});

// Retrieves All REG Transactions
router.get('/transactions/reg', (req, res) => {
    Transaction.find({transactionType: "REG", "status": "approved"})
        .then(transactions => {
            res.json(transactions);
        });
});

// Retrieves All Adjusting Entries for A Specific Account
router.get('/transactions/aje/:account', (req, res) => {
    Transaction.find({transactionType: "AJE", "status": "approved"})
        .then(transactions => {
            res.json(transactions);
        });
});

// Saves New Transaction To Database
router.post('/transaction/add', (req, res) => {
    const newTransaction = new Transaction({
        debitEntries: req.body.debitEntries,
        creditEntries: req.body.creditEntries,
        date: req.body.date,
        description: req.body.description,
        status: req.body.status,
        rejectReason: req.body.rejectReason,
        file: req.body.file,
        fileType: req.body.fileType,
        transactionType: req.body.transactionType
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
