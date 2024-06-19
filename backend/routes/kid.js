const express = require('express');
const router = express.Router();
const {
    createKidProfile,
    editKidProfile,
    deleteKidProfile,
    getAllKidProfiles,
    getKidProfileById,
    getKidsByGuardianId,
    approveKid, rejectKid } = require('../controllers/kid');
const { verifyToken, verifyAdminOrSecretary } = require('../middlewares/verifyToken');


router.post('/', createKidProfile);
router.put('/:id', editKidProfile);
router.put('/approve/:id', approveKid);
router.delete('/reject/:id', rejectKid);
router.delete('/:id', deleteKidProfile);
router.get('/:id', getKidProfileById);
router.get('/', getAllKidProfiles);
router.get('/:guardianId/kids', getKidsByGuardianId);

module.exports = router;
