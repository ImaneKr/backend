const express = require('express');
const router = express.Router();
const { createAnnouncement, editAnnouncement, unpublishAnnouncement, getAllAnnouncements } = require('../controllers/announcement');





router.post('/', createAnnouncement);

router.put('/:announcement_id',editAnnouncement);

router.put('/:announcement_id/unpublish',   unpublishAnnouncement);

router.get('/', getAllAnnouncements);

module.exports = router;
