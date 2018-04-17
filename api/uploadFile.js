var express = require('express');
var router = express.Router();

var Transaction = require('../models/Transaction');

var fs = require('fs');
var mongoose = require('mongoose');
var Gridfs = require('gridfs-stream');
import { roleAuth } from '../config/auth.js';

router.post('/upload', roleAuth(['general', 'manager']), function(req, res){
   var db = mongoose.connection.db;
   var mongoDriver = mongoose.mongo;
   var gfs = new Gridfs(db, mongoDriver);

   var writestream = gfs.createWriteStream({
     filename: req.files.file.name,
     mode: 'w',
     content_type: req.files.file.mimetype,
     metadata: req.body
   });
   fs.createReadStream(req.files.file.path).pipe(writestream);
   writestream.on('close', function(file) {
     // Create new Transaction and set file id to this file's id.
     //transaction.file = file._id;
     //transaction.save(function(err, updatedUser) {
       //return res.json(200, transaction)
     //})
   //});
   //fs.unlink(req.files.file.path, function(err) {
     //console.log('success!')
   });
});

module.exports = router;
