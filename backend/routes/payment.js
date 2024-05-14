const express = require('express');
const router = express.Router();
const  {createCustomer,createCheckout, handleWebhook} = require('../controllers/payment');


router.post('/create-customer',createCustomer );
router.post('/create-checkout',createCheckout );
router.post('/webhook',handleWebhook );


module.exports = router;