const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TransactionSchema = Schema({
  debitAccount: {
      type: String,
      required: true
  },
  debitAmount: {
      type: Number,
      required: true
  },
  debitRefNum: {
    type: Number,
    required: true
  },
  creditAccount: {
      type: String,
      required: true
  },    
  creditAmount: {
      type: Number,
      required: true
  },
  creditRefNum: {
    type: Number,
    required: true
  },
  date: {
      type: String,
      required: true
  },
  description: {
      type: String,
      required: false
  },
  status: {
      type: String,
      required: true
  }
});

mongoose.model('transaction', TransactionSchema);
