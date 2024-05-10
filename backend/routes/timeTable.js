const express = require('express');
const router = express.Router();
const timetableController = require('../controllers/timeTable');


router.post('/', timetableController.createTimetableEntry);
router.get('/', timetableController.getAllTimetableEntries);

module.exports = router;
