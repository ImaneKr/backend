const express = require('express');
const router = express.Router();
const { createGuardian, editGuardian, getAllGuardians,getGuardianById } = require('../controllers/guardian');
const { verifyToken, verifyAdmin, verifySecretary, verifyAdminOrSecretary } = require('../middlewares/verifyToken');

router.post('/', verifyToken, verifyAdminOrSecretary, createGuardian);

router.put('/:guardian_id', verifyToken, verifyAdminOrSecretary, editGuardian);

router.get('/', verifyToken, verifyAdminOrSecretary, getAllGuardians);

router.get('/:guardian_id', verifyToken, verifyAdminOrSecretary, getGuardianById);

module.exports = router;