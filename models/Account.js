const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* 
FIELDS
    - name/id => Select list
    - type/category (asset,liability, etc.) => Select list
    - normal side (debit,credit) => Select list
    - currBalance (0 if not set)
    - date added
    - creator
    - active (true,false) => Checkbox
    - priority (number for liquidity [low to high])
*/

const AccountSchema = Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    normalSide: {
        type: String,
        required: true
    },
    currBalance: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    creatorId: {
        type: String,
        required: true 
    },
    isActive: {
        type: Boolean,
        required: true
    },
    priority: {
        type: Number,
        min: 1,
        required: true
    }
});

mongoose.model('account', AccountSchema);