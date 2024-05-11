const express = require('express');
const router = express.Router();
<<<<<<< Updated upstream
const {
    createGuardian,
    editGuardian,
    getAllGuardians,
    getGuardianById,
    deleteGuardian
} = require('../controllers/guardian');
=======
const { createGuardian, editGuardian, getAllGuardians, getGuardianById } = require('../controllers/guardian');
>>>>>>> Stashed changes

// Create a new Guardian
router.post('/', createGuardian);
<<<<<<< Updated upstream

// Update an existing Guardian
router.put('/:guardian_id', editGuardian);

// Get all Guardians
=======
router.put('/:id', editGuardian);
>>>>>>> Stashed changes
router.get('/', getAllGuardians);
router.get('/:id', getGuardianById);

// Get a Guardian by ID
router.get('/:guardian_id', getGuardianById);

// Delete a Guardian
router.delete('/:guardian_id', deleteGuardian);

module.exports = router;
