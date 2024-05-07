const express = require('express');
const router = express.Router();
const timetableController = require('../controllers/timeTable');


// Create a new timetable entry (accessible only to admin and secretary)
router.post('/', timetableController.createTimetableEntry);

// Get all timetable entries
router.get('/', timetableController.getAllTimetableEntries);

module.exports = router;
