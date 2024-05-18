const express = require('express');
const router = express.Router();
//const { getAllPayments } = require('../controllers/payment');
const  {createCustomer,createCheckout, handleWebhook} = require('../controllers/payment');
// Route to get all payments
//router.get('/payments', getAllPayments);
router.post('/create-customer', createCustomer);
router.post('/create-checkout', createCheckout);
router.post('/webhook', handleWebhook);


module.exports = router;





