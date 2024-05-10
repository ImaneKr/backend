const express = require('express');
const router = express.Router();
const { createStaff, deleteStaff, editStaff } = require('../controllers/staff');
const { verifyToken, verifyAdmin } = require('../middlewares/verifyToken');

router.use(verifyToken);

router.post('/',verifyAdmin,createStaff);

router.put('/:staff_id',verifyAdmin,editStaff );

router.delete('/', verifyAdmin,deleteStaff);

module.exports = router;