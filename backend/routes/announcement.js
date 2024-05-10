const express = require('express');
const router = express.Router();
const { createAnnouncement, editAnnouncement, unpublishAnnouncement, getAllAnnouncements } = require('../controllers/announcement');
const { verifyToken, verifyAdmin, verifySecretary } = require('../middlewares/verifyToken');


router.use(verifyToken);

router.post('/', verifyAdmin, verifySecretary, createAnnouncement);

router.put('/:announcement_id',  verifyAdmin, verifySecretary, editAnnouncement);

router.put('/:announcement_id/unpublish', verifyAdmin, verifySecretary,  unpublishAnnouncement);

router.get('/', verifyAdmin, verifySecretary, getAllAnnouncements);

module.exports = router;
