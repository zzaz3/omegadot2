const express = require('express');
const mongoose = require('mongoose');
const OktaJwtVerifier = require('@okta/jwt-verifier');

const router = express.Router();

// Import Member Model
require('../models/Member');
const Member = mongoose.model('member');

// Okta
const oktaJwtVerifier = new OktaJwtVerifier({
    issuer: 'https://dev-922121.oktapreview.com/oauth2/default',
    assertClaims: {
      aud: 'api://default',
    },
  });

  function authenticationRequired(req, res, next) {
    const authHeader = req.headers.authorization || '';
    const match = authHeader.match(/Bearer (.+)/);
  
    if (!match) {
      return res.status(401).end();
    }
  
    const accessToken = match[1];
  
    return oktaJwtVerifier.verifyAccessToken(accessToken)
      .then((jwt) => {
        req.jwt = jwt;
        next();
      })
      .catch((err) => {
        res.status(401).send(err.message);
      });
  }


router.get('/api/team', authenticationRequired, (req, res) => {
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

router.post('/api/team', authenticationRequired, (req, res, next) => {
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