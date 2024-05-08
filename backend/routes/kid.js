const express = require('express');
const router = express.Router();
const { createKidProfile, editKidProfile, deleteKidProfile, getAllKidProfiles } = require('../controllers/kid');

router.post('/', createKidProfile);

router.put('/:id', editKidProfile);

router.delete('/:id', deleteKidProfile);

router.get('/', getAllKidProfiles);

module.exports = router;
