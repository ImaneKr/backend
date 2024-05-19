const express = require('express');
const router = express.Router();
const  {addTimetableEntry, fetchTimetables, editTimetableEntry, deleteTimetableEntry}= require('../controllers/timeTable');

router.post('/', addTimetableEntry);
router.get('/:category_id',fetchTimetables );
router.put('/:id',editTimetableEntry);
router.delete('/:id',deleteTimetableEntry)

module.exports = router;
