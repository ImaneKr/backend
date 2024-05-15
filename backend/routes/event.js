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

router.post('/',verifyToken, verifyAdminOrSecretary, createEvent);

router.put('/:event_id', verifyToken, verifyAdminOrSecretary,editEvent);

router.delete('/:event_id', verifyToken, verifyAdminOrSecretary,deleteEvent);

router.get('/', verifyToken, verifyAdminOrSecretary,getAllEvents);

router.post('/:eventId/list',verifyToken, verifyAdminOrSecretary, createEventListEntry);

module.exports = router;
