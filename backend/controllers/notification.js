const { Notification } = require('../models/models');

// Get all notifications
exports.getAllNotifications = async (req, res) => {
    try {
        const notifications = await Notification.findAll();
        res.status(200).json(notifications);
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get notifications by guardian ID
exports.getNotificationsByGuardianId = async (req, res) => {
    try {
        const { guardianId } = req.params;
        const notifications = await Notification.findAll({ where: { guardian_id: guardianId } });
        res.status(200).json(notifications);
    } catch (error) {
        console.error(`Error fetching notifications for guardian ID ${guardianId}:`, error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Create a new notification
exports.createNotification = async (guardian_id, msg) => {
    try {

        const notification = await Notification.create({ guardian_id, msg });
        console.log(notification)
    } catch (error) {
        console.error('Error creating notification:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete a notification by ID
exports.deleteNotification = async (req, res) => {
    try {
        const { id } = req.params;
        await Notification.destroy({ where: { id } });
        res.status(204).send();
    } catch (error) {
        console.error(`Error deleting notification with ID ${id}:`, error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
