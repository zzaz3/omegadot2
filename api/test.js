const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

// Import Member Model
require('../models/Member');
const Member = mongoose.model('member');

router.get('/api/team', (req, res) => {
    // Retrieves All Members From DB
    Member.find()
        .then(members => {
            res.json(members);
        })
  });

// GET All Team Members From DB
router.get('/api/teamdb', (req, res) => {
    Member.find()
        .then(member => {
            member: member
        })
});

router.post('/api/team', (req, res, next) => {
    var member = new Member({
        firstName: req.body.firstName,
        lastName: req.body.lastName
    });

    member.save((err, member) => {
        if(err)
            return next(err);
        res.status(201).json(member);
    });
});

module.exports = router;