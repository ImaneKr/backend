const { Guardian, Payment } = require('../models/models');
const crypto = require('crypto');
//const ngrok = require("@ngrok/ngrok");
const axios = require('axios'); 
// axios or fetch
require("dotenv").config();

const chargilyApiSecretKey = process.env.CHARGILY_SECRET_KEY;
// the API KEY IS USED TO CALCUTE THE SIGNATURE OF THE REQ
// FUNCTION TO CREATE A CUSTOMER IN CHARGIY
async function createCustomer (req, res){
  try {
    const { name, email, phone, state, address } = req.body;

    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.CHARGILY_SECRET_KEY}`,
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({
        name: name,
        email: email,
        phone: phone,
        address: {
          country: "DZ",
          state: state,
          address: address
        },
        metadata: []
      })
    };

    const response = await axios.post('https://pay.chargily.net/test/api/v2/customers', options.data, {
      headers: options.headers
    });

    res.json(response.data);
    // TODO WE NEED THE ID OF THE CUSTOMER TO CREATE A CHECKOUT
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
// CREATE A CHECKOUT
async function createCheckout(req, res) {

  // payment_method can be either : edahabia or cib

  const { amount,payment_method, guardian_id } = req.body;

  const options = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.CHARGILY_SECRET_KEY}`,
      'Content-Type': 'application/json'
    },
    // WE NEED CUSTOMER ID WEBHOOK URL failire url and success url PAYMENT METHOD ENUM BETWEEN EDDAHABIA AND CIB

    // we need to expose this server to ngrok so we can use it for the webhook
    // after posting this we get a response something like this : 
    // {
    //   "livemode": false,
    //   "id": "01hxw64ncr60px7582e9413jda",
    //   "entity": "checkout",
    //   "amount": 4002,
    //   "currency": "dzd",
    //   "fees": 0,
    //   "fees_on_merchant": 0,
    //   "fees_on_customer": 0,
    //   "pass_fees_to_customer": null,
    //   "chargily_pay_fees_allocation": "customer",
    //   "status": "pending",
    //   "deposit_transaction_id": null,
    //   "locale": "ar",
    //   "description": null,
    //   "metadata": null,
    //   "success_url": "https://wwww.google.com",
    //   "failure_url": "https://wwww.google.com",
    //   "webhook_endpoint": null,
    //   "payment_method": "edahabia",
    //   "invoice_id": null,
    //   "customer_id": "01hxw5jxc7v0466pc33tqt1jz9",
    //   "payment_link_id": null,
    //   "created_at": 1715711661,
    //   "updated_at": 1715711661,
    //   "shipping_address": null,
    //   "collect_shipping_address": 0,
    //   "discount": null,
    //   "amount_without_discount": 0,
    //   "checkout_url": "https://pay.chargily.dz/test/checkouts/01hxw64ncr60px7582e9413jda/pay"
    // }

    // so here we should send the checkout_url to the mobile app and launch it via url_launcher package to make the payment process

    
    data: JSON.stringify({
      amount: amount,
      currency: "dzd",
      success_url: 'https://app.com/payments/success',
      failure_url: 'https://app.com/payments/success',
      customer_id: null,
      webhook_endpoint: null,
    })
  };

  try {
    const response = await axios.post('https://pay.chargily.net/test/api/v2/checkouts', options.data, {
      headers: options.headers
    });

    const { id: checkoutId } = response.data;

    // Create a new payment record in the database
    await Payment.create({
      payment_date: new Date(),
      amount: amount,
      status: 'unpaid',
      checkoutId: checkoutId,
      guardian_id: guardian_id
    });

    res.json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function handleWebhook (req, res){
  // Extracting the 'signature' header from the HTTP request
  const signature = req.get("signature");

  // Getting the raw payload from the request body
  const payload = JSON.stringify(req.body);

  console.log(payload);

  // If there is no signature, ignore the request
  if (!signature) {
    return res.sendStatus(400);
  }

  // Calculate the signature
  const computedSignature = crypto
    .createHmac("sha256", chargilyApiSecretKey)
    .update(payload)
    .digest("hex");

  // If the calculated signature doesn't match the received signature, ignore the request
  if (computedSignature !== signature) {
    return res.sendStatus(403);
  }

  // If the signatures match, proceed to decode the JSON payload
  const event = req.body;

  console.log(`event is : ${event}`);

  // Switch based on the event type
  switch (event.type) {
    case "checkout.paid":
      const checkout = event.data;
      console.log(checkout);
      // Handle the successful payment.
      try {
        // Find the corresponding payment in the database
        const payment = await Payment.findOne({ where: { checkoutId: checkout.id } });

        if (!payment) {
          console.error("Payment not found in the database");
          return res.sendStatus(404);
        }

        // Update the payment status to 'paid'
        await payment.update({ status: 'paid' });

        // Find the corresponding guardian in the database
        const guardian = await Guardian.findByPk(payment.guardian_id);

        if (!guardian) {
          console.error("Guardian not found in the database");
          return res.sendStatus(404);
        }

        
      } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
      }
      break;
    case "checkout.failed":
      const failedCheckout = event.data;
      console.log(failedCheckout);
    // Handle the failed payment.
    try {
      // Find the corresponding payment in the database
      const payment = await Payment.findOne({ where: { checkoutId: failedCheckout.id } });

      if (!payment) {
        console.error("Payment not found in the database");
        return res.sendStatus(404);
      }

      // Update the payment status to 'failed'
      await payment.update({ status: 'failed' });

      // Find the corresponding guardian in the database
      const guardian = await Guardian.findByPk(payment.guardian_id);

      if (!guardian) {
        console.error("Guardian not found in the database");
        return res.sendStatus(404);
      }

      
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }
    break;

    case "checkout.expired":
      const expiredCheckout = event.data;
      console.log(expiredCheckout);
      // Handle the expired payment.
      try {
        // Find the corresponding payment in the database
        const payment = await Payment.findOne({ where: { checkoutId: expiredCheckout.id } });

        if (!payment) {
          console.error("Payment not found in the database");
          return res.sendStatus(404);
        }

        // Update the payment status to 'expired'
        await payment.update({ status: 'expired' });

        // Find the corresponding guardian in the database
        const guardian = await Guardian.findByPk(payment.guardian_id);

        if (!guardian) {
          console.error("Guardian not found in the database");
          return res.sendStatus(404);
        }

       
      } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
      }
      break;
    default:
      console.log("Unknown event type");
  }

  // Respond with a 200 OK status code to let us know that you've received the webhook
  res.sendStatus(200);
};
module.exports= {createCustomer, createCheckout, handleWebhook};