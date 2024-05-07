const express = require('express');
const router = express.Router();
const eventController = require('../controllers/event');
const authMiddleware = require('../middleware/authMiddleware');

// Create a new event (accessible only to admin and secretary)
router.post('/', authMiddleware, eventController.createEvent);

// Get all events
router.get('/', eventController.getAllEvents);

// Create an event list entry (accessible only to admin and secretary)
router.post('/:eventId/event-list', authMiddleware, eventController.createEventListEntry);

module.exports = router;
