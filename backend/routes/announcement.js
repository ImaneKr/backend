const express = require('express');
const router = express.Router();
const announcementController = require('../controllers/announcement');

// Create a new announcement (accessible only to admin and secretary)
router.post('/', announcementController.createAnnouncement);

// Get all announcements
router.get('/', announcementController.getAllAnnouncements);

module.exports = router;
