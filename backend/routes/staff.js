const express = require('express');
const router = express.Router();
const { createStaff, deleteStaff, editStaff } = require('../controllers/staff');
const verifyAdmin = require('../middlewares/verifyToken')

router.post('/', createStaff);

router.put('/:staff_id', editStaff);

router.delete('/', deleteStaff);

module.exports = router;