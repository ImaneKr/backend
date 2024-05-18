const express = require('express');
const router = express.Router();
const { getAllPayments } = require('../controllers/paymentController');
const  {createCustomer,createCheckout, handleWebhook} = require('../controllers/paymentProcess');
// Route to get all payments
router.get('/payments', getAllPayments);
router.post('/create-customer',createCustomer );
router.post('/create-checkout',createCheckout );
router.post('/webhook',handleWebhook );

module.exports = router;





