const express = require('express');
const { getAllSubjectMarksForKid, editEvaluationMarks, addKidMarks } = require('../controllers/evaluation');

const router = express.Router();
router.get('/addmark/:kid_id', addKidMarks)
router.get('/:kid_id', getAllSubjectMarksForKid);
router.put('/', editEvaluationMarks);

module.exports = router;
