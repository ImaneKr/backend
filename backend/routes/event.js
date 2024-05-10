const express = require('express');
const router = express.Router();

const { createEvent, editEvent, deleteEvent, getAllEvents, createEventListEntry } = require('../controllers/event');
const { verifyToken, verifyAdmin, verifySecretary } = require('../middlewares/verifyToken');

router.use(verifyToken);
router.post('/',  verifyAdmin, verifySecretary, createEvent);

router.put('/:event_id',  verifyAdmin, verifySecretary,editEvent);

router.delete('/:event_id',  verifyAdmin, verifySecretary, deleteEvent);

router.get('/',  verifyAdmin, verifySecretary,getAllEvents);

router.post('/:eventId/list', verifyAdmin, verifySecretary, createEventListEntry);

module.exports = router;
