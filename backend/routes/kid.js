const express = require('express');
const router = express.Router();
const {
    createKidProfile,
    editKidProfile,
    deleteKidProfile,
    getAllKidProfiles,
    getKidProfileById,
    /*getKidsByGuardianId */// Import the new function
} = require('../controllers/kid');

// Create a new Kid Profile
router.post('/', createKidProfile);

// Update an existing Kid Profile
router.put('/:id', editKidProfile);

// Delete a Kid Profile
router.delete('/:id', deleteKidProfile);
router.get('/:id', getKidProfileById);
// Get all Kid Profiles
router.get('/', getAllKidProfiles);

// Get a Kid Profile by ID


// Get all kids related to a Guardian by Guardian ID
//router.get('/guardian/:guardianId/kids', getKidsByGuardianId);

module.exports = router;
