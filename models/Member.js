const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MemberSchema = Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  }
});

mongoose.model('member', MemberSchema);
