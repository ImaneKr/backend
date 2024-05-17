const express = require('express');
const router = express.Router();
const { createStaff, deleteStaff, editStaff, getAllStaff, getStaffById } = require('../controllers/staff');
const { verifyAdmin, verifyToken } = require('../middlewares/verifyToken')

router.post('/', createStaff);

router.put('/:staff_id', editStaff);

router.delete('/:id', deleteStaff);
router.get('/', getAllStaff);
router.get('/:staff_id', getStaffById);

module.exports = router;