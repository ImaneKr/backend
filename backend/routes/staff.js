const express = require('express');
const router = express.Router();
const { createStaff, deleteStaff, editStaff, getAllStaff } = require('../controllers/staff');
const { verifyAdmin, verifyToken } = require('../middlewares/verifyToken')

router.post('/', createStaff);

router.put('/:staff_id', editStaff);

router.delete('/', deleteStaff);
router.get('/', getAllStaff);

module.exports = router;