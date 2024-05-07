const express = require('express');
const router = express.Router();
const { createGuardian, editGuardian, getAllGuardians } = require('../controllers/guardian');

// Route for creating a guardian account
router.post('/', createGuardian);

// Route for editing a guardian account
router.put('/:guardian_id', editGuardian);

// Route for fetching all guardian data
router.get('/', getAllGuardians);

module.exports = router;
