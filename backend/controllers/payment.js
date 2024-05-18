const { Guardian, Payment } = require("../models/models");
const crypto = require("crypto");
//const ngrok = require("@ngrok/ngrok");
const axios = require("axios");
// axios or fetch
require("dotenv").config();

async function createCustomer(req, res) {
  try {
    const { name, email, phone, state, address } = req.body;

    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CHARGILY_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        name: name,
        email: email,
        phone: phone,
        address: {
          country: "DZ",
          state: state,
          address: address,
        },
        metadata: [],
      }),
    };

    const response = await axios.post(
      "https://pay.chargily.net/test/api/v2/customers",
      options.data,
      {
        headers: options.headers,
      }
    );
    const customerData = response.data;
    const customerId = customerData.id;

    res.json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}
// CREATE A CHECKOUT
async function createCheckout(req, res) {
  const { amount, guardian_id, customerId } = req.body;

  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.CHARGILY_SECRET_KEY}`,
      "Content-Type": "application/json",
    },

    data: JSON.stringify({
      amount: amount,
      currency: "dzd",
      success_url: "https://app.com/payments/success",
      failure_url: "https://app.com/payments/success",
      customer_id: customerId,
      webhook_endpoint:
        "https://upward-native-eft.ngrok-free.app/payment/webhook",
    }),
  };

  try {
    const response = await axios.post(
      "https://pay.chargily.net/test/api/v2/checkouts",
      options.data,
      {
        headers: options.headers,
      }
    );

    const { id, customer_id, status } = response.data;

    // Create a new payment record in the DB
    const payment = await Payment.create({
      created_at: new Date(),
      updated_at: new Date(),
      amount: amount,
      status: status,
      customerId: customer_id,
      checkoutId: id,
      guardian_id: guardian_id,
    });

    if (payment) {
      console.log("Payment has been inserted successfully");
    } else {
      console.log("Failed to insert payment");
    }

    res.json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function handleWebhook(req, res) {
  const event = req.body;

  console.log("THE EVENT IS " + event.type);

  switch (event.type) {
    case "checkout.paid":
      const checkout = event.data;
      console.log(checkout);
      // Handle the successful payment.
      try {
        // Find the corresponding payment in the database
        const payment = await Payment.findOne({
          where: { checkoutId: checkout.id },
        });

        if (!payment) {
          console.error("Payment not found in the database");
          return res.sendStatus(404);
        }

        // Update the payment status to 'paid'
        await payment.update({ status: "paid" });

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
        const payment = await Payment.findOne({
          where: { checkoutId: failedCheckout.id },
        });

        if (!payment) {
          console.error("Payment not found in the database");
          return res.sendStatus(404);
        }

        // Update the payment status to 'failed'
        await payment.update({ status: "failed" });

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

    case "checkout.canceled":
      const ev = event.data;
      try {
        const payment = await Payment.findOne({
          where: { checkoutId: ev.id },
        });

        if (!payment) {
          console.error("Payment not found in the database");
          return res.sendStatus(404);
        }

        // Update the payment status to 'failed'
        await payment.update({ status: "failed" });

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
        const payment = await Payment.findOne({
          where: { checkoutId: expiredCheckout.id },
        });

        if (!payment) {
          console.error("Payment not found in the database");
          return res.sendStatus(404);
        }

        // Update the payment status to 'expired'
        await payment.update({ status: "expired" });

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
}
module.exports = { createCustomer, createCheckout, handleWebhook };