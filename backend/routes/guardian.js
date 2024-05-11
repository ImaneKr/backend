const express = require('express');
const router = express.Router();
const { createGuardian, editGuardian, getAllGuardians,getGuardianById } = require('../controllers/guardian');
const { verifyToken, verifyAdmin, verifySecretary } = require('../middlewares/verifyToken');

router.use(verifyToken);

router.post('/',verifyAdmin, verifySecretary,  createGuardian);

router.put('/:guardian_id',  editGuardian);

router.get('/', getAllGuardians);

router.get('/:guardian_id', getGuardianById);

module.exports = router;
