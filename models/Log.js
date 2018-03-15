const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LogSchema = Schema({
  name: {
    type: String,
    required: true
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
  beforeValue: {
    type: Number,
    required: true
  },
  afterValue: {
    type: Number,
    required: true
  }
});

mongoose.model('log', LogSchema);
