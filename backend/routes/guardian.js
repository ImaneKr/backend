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
router.put('/:id', editGuardian);
router.get('/', getAllGuardians);
router.get('/:id', getGuardianById);

// Get a Guardian by ID

// Delete a Guardian
router.delete('/:guardian_id', deleteGuardian);

module.exports = router;
