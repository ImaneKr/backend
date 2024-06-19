const express = require('express');
const router = express.Router();
const {getAllNotifications,getNotificationsByGuardianId,createNotification,deleteNotification} = require('../controllers/notification');

// Get all notifications
router.get('/',getAllNotifications);

// Get notifications by guardian ID
router.get('/guardian/:guardianId', getNotificationsByGuardianId);

// Create a new notification
router.post('/', createNotification);

// Delete a notification by ID
router.delete('/:id',deleteNotification);

module.exports = router;
