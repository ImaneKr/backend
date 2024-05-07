const express = require('express');
const router = express.Router();
const timetableController = require('../controllers/timeTable');
const authMiddleware = require('../middleware/authMiddleware');

// Create a new timetable entry (accessible only to admin and secretary)
router.post('/', authMiddleware, timetableController.createTimetableEntry);

// Get all timetable entries
router.get('/', timetableController.getAllTimetableEntries);

module.exports = router;
