const express = require('express');
const router = express.Router();

router.get('/accounts/list', (req, res) => {
  const accounts = [
    // ASSETS
    { "name": "Cash", "number": "101", "type": "asset", "subtype": "current" },
    { "name": "Petty Cash", "number": "105", "type": "asset", "subtype": "current" },
    { "name": "Land", "number": "161", "type": "asset", "subtype": "current" },
    { "name": "Natural Resources", "number": "162", "type": "asset", "subtype": "long-term" },
    // REVENUES
    { "name": "Sales", "number": "401", "type": "revenue", "subtype": "current"},
    { "name": "Interest Revenue", "number": "411", "type": "revenue", "subtype": "long-term" },
    { "name": "Rent Revenue", "number": "412", "type": "revenue", "subtype": "long-term" },
    { "name": "Sinking Fund Earnings", "number": "414", "type": "revenue", "subtype": "long-term" },
    // LIABILITIES
    { "name": "Notes Payable", "number": "201", "type": "liability", "subtype": "current" },
    { "name": "Income Tax Payable", "number": "204", "type": "liability", "subtype": "long-term" },
    { "name": "Medicare Tax Payable", "number": "213", "type": "liability", "subtype": "long-term" },
    { "name": "Wages Payable", "number": "219", "type": "liability", "subtype": "current" }
  ]

  res.json(accounts);
});

module.exports = router;
