const { Payment, Guardian, Kid } = require('../models/models');

const { Payment } = require('../models'); // Assuming you have your Sequelize models defined and exported

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
const cron = require('node-cron');
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
}

module.exports = {
  getAllPayments
};
