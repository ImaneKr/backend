const express = require('express');
const router = express.Router();
const {
    createEvent,
    editEvent,
    deleteEvent,
    getAllEvents,
    createEventListEntry
} = require('../controllers/event');
const { verifyToken, verifyAdminOrSecretary } = require('../middlewares/verifyToken');

router.post('/', createEvent);

router.put('/:event_id', editEvent);

router.delete('/:event_id', deleteEvent);

router.get('/', getAllEvents);

router.post('/:eventId/list', createEventListEntry);

module.exports = router;
