const express = require('express');
const router = express.Router();
const timetableController = require('../controllers/timeTable');
const { verifyToken } = require('../middlewares/verifyToken');

router.use(verifyToken);

router.post('/', timetableController.createTimetableEntry);
router.get('/', timetableController.getAllTimetableEntries);

module.exports = router;
