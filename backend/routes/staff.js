const express = require('express');
const router = express.Router();
const { createStaff, deleteStaff, editStaff } = require('../controllers/staff');

// Route for creating a staff account
router.post('/', createStaff);

// Route for editing a staff account
router.put('/:staff_id', editStaff );

// Route for fetching all staff data
router.delete('/', deleteStaff);

module.exports = router;