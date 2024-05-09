const express = require('express');
const router = express.Router();

const { createDummyTeacher, createDummySecretary,createDummyAdmin,createDummyGuardian } = require('../controllers/dummyUsersController');

router.post('/teacher', createDummyTeacher);
router.post('/secretary', createDummySecretary);
router.post('/admin',createDummyAdmin);
router.post('/guardian', createDummyGuardian);

module.exports = router;