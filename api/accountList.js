const express = require('express');
const router = express.Router();

router.get('/accounts/list', (req, res) => {
  const accounts = [
    // ASSETS
    { "id": 1, "name": "Cash", "number": "100", "type": "asset", "subtype": "current" },
    { "id": 2, "name": "Account Receivable", "number": "110", "type": "asset", "subtype": "current" },
    { "id": 3, "name": "Prepaid Rend", "number": "120", "type": "asset", "subtype": "current" },
    { "id": 4, "name": "Supplies", "number": "130", "type": "asset", "subtype": "current" },
    { "id": 5, "name": "Office Equipment", "number": "140", "type": "asset", "subtype": "n/a" },
    { "id": 6, "name": "Accumulated Depreciation", "number": "150", "type": "asset", "subtype": "n/a" },
    // EXPENSES
    { "id": 7, "name": "Insurance Expense", "number": "200", "type": "expense", "subtype": "n/a" },
    { "id": 8, "name": "Depreciation Expense", "number": "210", "type": "expense", "subtype": "n/a" },
    { "id": 9, "name": "Rent Expense", "number": "220", "type": "expense", "subtype": "n/a" },
    { "id": 10, "name": "Supplies Expense", "number": "230", "type": "expense", "subtype": "n/a" },
    { "id": 11, "name": "Salaries Expense", "number": "240", "type": "expense", "subtype": "n/a" },
    { "id": 12, "name": "Telephone Expense", "number": "250", "type": "expense", "subtype": "n/a" },
    { "id": 13, "name": "Utilities Expense", "number": "260", "type": "expense", "subtype": "n/a" },
    { "id": 14, "name": "Advertising Expense", "number": "270", "type": "expense", "subtype": "n/a" },
    // LIABILITIES
    { "id": 15, "name": "Accounts Payable", "number": "300", "type": "liability", "subtype": "current" },
    { "id": 16, "name": "Salaries Payable", "number": "310", "type": "liability", "subtype": "current" },
    { "id": 17, "name": "Unearned Revenue", "number": "320", "type": "liability", "subtype": "n/a" },
    // OWNER'S EQUITY
    { "id": 18, "name": "Contributed Capital", "number": "400", "type": "owner's equity", "subtype": "n/a" },
    { "id": 19, "name": "Notes Payable", "number": "410", "type": "owner's equity", "subtype": "n/a" },
    // REVENUES
    { "id": 20, "name": "Service Revenue", "number": "500", "type": "revenue", "subtype": "n/a"}
  ]

  res.json(accounts);
});

module.exports = router;
