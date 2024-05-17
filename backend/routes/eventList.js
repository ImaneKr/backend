const express = require('express');
const router = express.Router();
const {
    declineEvent,
    acceptEvent,
    getEventAcceptanceList
} = require('../controllers/eventList');

// Route for fetching the acceptance list of an event
router.get('/:eventId/acceptance', getEventAcceptanceList);

// Route for accepting an event invitation
router.post('/:eventId/accept', acceptEvent);

// Route for declining an event invitation
router.post('/:eventId/decline', declineEvent);

module.exports = router;
