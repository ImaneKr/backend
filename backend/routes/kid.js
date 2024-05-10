const express = require('express');
const router = express.Router();
const { createKidProfile, editKidProfile, deleteKidProfile, getAllKidProfiles } = require('../controllers/kid');
const { verifyToken, verifyAdmin, verifySecretary } = require('../middlewares/verifyToken');

router.use(verifyToken);

router.post('/', verifyAdmin, verifySecretary, createKidProfile);

router.put('/:id', verifyAdmin, verifySecretary, editKidProfile);

router.delete('/:id',verifyAdmin, verifySecretary,  deleteKidProfile);

router.get('/', verifyAdmin, verifySecretary, getAllKidProfiles);

module.exports = router;
