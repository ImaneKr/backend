const express = require('express');
const router = express.Router();
const {
    createGuardian,
    editGuardian,
    getAllGuardians,
    getGuardianById,
    deleteGuardian
} = require('../controllers/guardian');

// Create a new Guardian
router.post('/', createGuardian);

// Update an existing Guardian
router.put('/:guardian_id', editGuardian);

// Get all Guardians
router.get('/', getAllGuardians);

// Get a Guardian by ID
router.get('/:guardian_id', getGuardianById);

// Delete a Guardian
router.delete('/:guardian_id', deleteGuardian);

module.exports = router;
