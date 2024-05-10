const express = require('express');
const router = express.Router();
const { createGuardian, editGuardian, getAllGuardians } = require('../controllers/guardian');
const { verifyToken, verifyAdmin, verifySecretary } = require('../middlewares/verifyToken');

router.use(verifyToken);

router.post('/', verifyAdmin, verifySecretary, createGuardian);

router.put('/:guardian_id',verifyAdmin, verifySecretary,  editGuardian);

router.get('/', verifyAdmin, verifySecretary, getAllGuardians);

module.exports = router;
