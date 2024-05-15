const express = require('express');
const router = express.Router();
const {
    createGuardian,
    editGuardian,
    getAllGuardians,
    getGuardianById,
    deleteGuardian
} = require('../controllers/guardian');
const { verifyToken, verifyAdminOrSecretary } = require('../middlewares/verifyToken');


// Create a new Guardian
router.post('/', verifyToken, verifyAdminOrSecretary,createGuardian);
router.put('/:id',verifyToken, verifyAdminOrSecretary, editGuardian);
router.get('/',verifyToken, verifyAdminOrSecretary, getAllGuardians);
router.get('/:id',verifyToken, verifyAdminOrSecretary, getGuardianById);

// Get a Guardian by ID

// Delete a Guardian
router.delete('/:guardian_id',verifyToken, verifyAdminOrSecretary, deleteGuardian);

module.exports = router;
