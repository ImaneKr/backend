const express = require('express');
const router = express.Router();
const { createAnnouncement, editAnnouncement, unpublishAnnouncement, getAllAnnouncements } = require('../controllers/announcement');
const { verifyAdminOrSecretary, verifyToken } = require('../middlewares/verifyToken')

router.post('/', verifyAdminOrSecretary, verifyToken, createAnnouncement);

router.put('/:announcement_id', verifyAdminOrSecretary, verifyToken, editAnnouncement);

router.put('/:announcement_id/unpublish', verifyAdminOrSecretary, verifyToken, unpublishAnnouncement);

router.get('/', verifyAdminOrSecretary, verifyToken, getAllAnnouncements);

module.exports = router;
