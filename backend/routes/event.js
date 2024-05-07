const express = require('express');
const router = express.Router();
const eventController = require('../controllers/event');

// Create a new event (accessible only to admin and secretary)
router.post('/', eventController.createEvent);

// Get all events
router.get('/', eventController.getAllEvents);

// Create an event list entry (accessible only to admin and secretary)
router.post('/:eventId/event-list',  eventController.createEventListEntry);

module.exports = router;
