const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LogSchema = Schema({
  name: {
    type: String,
    required: false
  },
  time: {
    type: Date,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  changedBy: {
    type: String,
    required: true
  },
  data: {
    type: {},
    required: false
  }
});

mongoose.model('log', LogSchema);
