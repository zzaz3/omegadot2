var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Transaction = require('../models/Transaction');

var fs = require('fs');
import { roleAuth } from '../config/auth.js';

// example schema
var schema = new Schema({
  file: { data: String, contentType: String }
});

// our model
var File = mongoose.model('File', schema);

router.post('/upload', function(req, res){
  console.log("help me");
  var db = mongoose.connection.db;
  var mongoDriver = mongoose.mongo;
  var file = new File;
  file.data = req.body.file;
  file.contentType = 'image/png';
  file.save(function (err, a) {
    if (err) throw err;
  })
});

module.exports = router;
