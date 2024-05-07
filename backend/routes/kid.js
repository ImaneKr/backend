const express = require('express');
const router = express.Router();
const { createKidProfile, editKidProfile, deleteKidProfile, getAllKidProfiles } = require('../controllers/kid');

// Route for creating a kid profile
router.post('/', createKidProfile);

// Route for editing a kid profile
router.put('/:id', editKidProfile);

// Route for deleting a kid profile
router.delete('/:id', deleteKidProfile);

// Route for getting all kid profiles
router.get('/', getAllKidProfiles);

module.exports = router;
