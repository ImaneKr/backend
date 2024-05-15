const express = require('express');
const router = express.Router();
const { createStaff, deleteStaff, editStaff, getAllStaff } = require('../controllers/staff');
const {verifyAdmin,verifyToken} = require('../middlewares/verifyToken')

router.post('/', verifyAdmin,verifyToken,createStaff);

router.put('/:staff_id',verifyAdmin,verifyToken, editStaff);

router.delete('/',verifyAdmin,verifyToken, deleteStaff);
router.get('/',verifyAdmin,verifyToken,getAllStaff);

module.exports = router;