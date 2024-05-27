const { Guardian, Payment ,Kid } = require("../models/models");
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
  const { amount, guardian_id, customerId, kid_id } = req.body;
  console.log('-----------------');
  console.log(customerId);
  console.log('-----------------');
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
    console.log("kid_id value:", kid_id);

    // Create a new payment record in the DB
    const payment = await Payment.create({
      created_at: new Date(),
      updated_at: new Date(),
      amount: amount,
      status: status,
      customerId: customer_id,
      checkoutId: id,
      guardian_id: guardian_id,
      kid_id: kid_id,
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
////////// functions to retreive DATA FOR THE DASHBOARD 
// Controller function to update payment status and date at the start of each month

async function updatePaymentStatusAndDate() {
  try {
    // Get the current date
    const currentDate = new Date();

    // Get the first day of the next month
    const firstDayOfNextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);

    // Get the last day of the current month
    const lastDayOfCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);

    // Find all payments that are currently 'paid'
    const paidPayments = await Payment.findAll({
      where: {
        status: 'paid',
        payment_date: {
          [Op.lte]: lastDayOfCurrentMonth // Payments paid in the current month
        }
      }
    });

    // Update status to 'unpaid' and update payment date to first day of next month
    await Promise.all(paidPayments.map(async (payment) => {
      // Preserve history of previous status
      await payment.update({
        status: 'unpaid',
        payment_date: firstDayOfNextMonth
      });
    }));

    console.log('Payment status and date updated successfully.');
  } catch (error) {
    console.error('Error updating payment status and date:', error);
  }
}

// Schedule the function to run at the start of each month
// Assuming you're using a scheduler like node-cron
/*const cron = require('node-cron');
// At 00:00 on the first day of every month
cron.schedule('0 0 1 * *', () => {
  updatePaymentStatusAndDate();
});

async function getAllPayments(req, res) {
  try {
    const allPayments = await Payment.findAll({
      include: [
        {
          model: Guardian,
          attributes: ['guardian_id', 'guardian_name'] // Include only necessary attributes
        },
        {
          model: Kid,
          attributes: ['kid_id', 'kid_name'] // Include only necessary attributes
        }
      ]
    });

    return res.status(200).json(allPayments);
  } catch (error) {
    console.error('Error fetching all payments:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}*/

module.exports = { createCustomer, createCheckout, handleWebhook };