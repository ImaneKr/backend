const express = require('express');
const router = express.Router();
const { getAllPayments } = require('../controllers/paymentController');

// Route to get all payments
router.get('/payments', getAllPayments);

module.exports = router;
