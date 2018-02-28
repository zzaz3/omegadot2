const express = require('express');
const router = express.Router();

router.get('/accounts/list', (req, res) => {
  const accounts = [
    // ASSETS
    { "name": "Cash", "number": "101", "category": "asset" },
    { "name": "Petty Cash", "number": "105", "category": "asset" },
    { "name": "Land", "number": "161", "category": "asset" },
    { "name": "Natural Resources", "number": "162", "category": "asset" },
    // REVENUES
    { "name": "Sales", "number": "401", "category": "revenue" },
    { "name": "Interest Revenue", "number": "411", "category": "revenue" },
    { "name": "Rent Revenue", "number": "412", "category": "revenue" },
    { "name": "Sinking Fund Earnings", "number": "414", "category": "revenue" },
    // LIABILITIES
    { "name": "Notes Payable", "number": "201", "category": "liability" },
    { "name": "Income Tax Payable", "number": "204", "category": "liability" },
    { "name": "Medicare Tax Payable", "number": "213", "category": "liability" },
    { "name": "Wages Payable", "number": "219", "category": "liability" }
  ]

  res.json(accounts);
});

module.exports = router;
