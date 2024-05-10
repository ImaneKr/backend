const express = require('express');
const router = express.Router();
const { createGuardian, editGuardian, getAllGuardians } = require('../controllers/guardian');

router.post('/', createGuardian);

router.put('/:guardian_id', editGuardian);

router.get('/', getAllGuardians);

module.exports = router;
