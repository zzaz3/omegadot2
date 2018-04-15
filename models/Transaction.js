const mongoose = require('mongoose');
const Entry = require('../client/src/components/Transactions/Entry');

const Schema = mongoose.Schema;

const TransactionSchema = Schema({
  debitEntries: [
      {
          account: {
              type: String,
              required: true
          },
          amount: {
              type: Number,
              required: true
          }
      }
  ]//,
//   creditEntries: [
//       {
//         account: {
//             type: String,
//             required: true
//         },
//         amount: {
//             type: Number,
//             required: true
//         }
//       }
//   ],
//   date: {
//       type: String,
//       required: true
//   },
//   description: {
//       type: String,
//       required: false
//   },
//   status: {
//       type: String,
//       required: true
//   },
//   rejectReason: {
//       type: String,
//       required: false
//   }
});

mongoose.model('transaction', TransactionSchema);
