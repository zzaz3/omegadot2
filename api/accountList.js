const express = require('express');
const router = express.Router;

router.get('/accounts/list', (req, res) => {
    const accounts = [
        // ASSETS
        {"name": "Cash", "number":"101", "category": "asset"},
        {"name": "Petty Cash", "number":"105", "category": "asset"},
        {"name": "Land", "number":"161", "category": "asset"},
        {"name": "Natural Resources", "number":"162", "category": "asset"},
        // REVENUES
        {"name": "Interest Revenue", "number":"411", "category": "revenue"},
        {"name": "Rent Revenue", "number":"412", "category": "revenue"},
        {"name": "Subscriptions Revenue", "number":"413", "category": "revenue"},
        {"name": "Sales", "number":"401", "category": "revenue"},
        // LIABILITIES
        {"name": "Notes Payable", "number":"201", "category": "liability"},
        {"name": "Income Tax Payable", "number":"204", "category": "liability"},
        {"name": "Sales Tax Payable", "number":"231", "category": "liability"},
        {"name": "Common Dividends Payable", "number":"205", "category": "liability"}
    ]
    
    res.json(accounts);
});

module.exports = router;