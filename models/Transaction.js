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
  creditAccount: {
      type: String,
      required: true
  },    
  creditAmount: {
      type: Number,
      required: true
  },
  date: {
      type: Date,
      required: true
  },
  description: {
      type: String,
      required: false
  }
});

mongoose.model('transaction', TransactionSchema);
