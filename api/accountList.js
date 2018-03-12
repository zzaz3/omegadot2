const express = require('express');
const router = express.Router();

router.get('/accounts/list', (req, res) => {
  const accounts = [
    // ASSETS
    { "id": 1, "name": "Cash", "number": "101", "type": "asset", "subtype": "current" },
    { "id": 2, "name": "Petty Cash", "number": "105", "type": "asset", "subtype": "current" },
    { "id": 3, "name": "Land", "number": "161", "type": "asset", "subtype": "current" },
    { "id": 4, "name": "Natural Resources", "number": "162", "type": "asset", "subtype": "long-term" },
    // REVENUES
    { "id": 5, "name": "Sales", "number": "401", "type": "revenue", "subtype": "current"},
    { "id": 6, "name": "Interest Revenue", "number": "411", "type": "revenue", "subtype": "long-term" },
    { "id": 7, "name": "Rent Revenue", "number": "412", "type": "revenue", "subtype": "long-term" },
    { "id": 8, "name": "Sinking Fund Earnings", "number": "414", "type": "revenue", "subtype": "long-term" },
    // LIABILITIES
    { "id": 9, "name": "Notes Payable", "number": "201", "type": "liability", "subtype": "current" },
    { "id": 10, "name": "Income Tax Payable", "number": "204", "type": "liability", "subtype": "long-term" },
    { "id": 11, "name": "Medicare Tax Payable", "number": "213", "type": "liability", "subtype": "long-term" },
    { "id": 12, "name": "Wages Payable", "number": "219", "type": "liability", "subtype": "current" }
  ]

  res.json(accounts);
});

module.exports = router;
