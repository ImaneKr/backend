const express = require('express');
const router = express.Router();
const { createAnnouncement, editAnnouncement, unpublishAnnouncement, getAllAnnouncements } = require('../controllers/announcement');
const { verifyToken, verifyAdmin, verifySecretary, verifyAdminOrSecretary } = require('../middlewares/verifyToken');




router.post('/', verifyToken, verifyAdminOrSecretary,createAnnouncement);

router.put('/:announcement_id', verifyToken, verifyAdminOrSecretary,editAnnouncement);

router.put('/:announcement_id/unpublish', verifyToken, verifyAdminOrSecretary,  unpublishAnnouncement);

router.get('/', verifyToken, verifyAdminOrSecretary,getAllAnnouncements);

module.exports = router;
