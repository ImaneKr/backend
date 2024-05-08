const express = require('express');
const router = express.Router();
const { createLunchMenu, editLunchMenu, deleteLunchMenu, getAllLunchMenus } = require('../controllers/lunchmenu');

// Import middleware
const { verifyAdmin, verifySecretary } = require("../middleware/auth");

// Route to create a lunch menu
router.post('/', verifyAdmin, createLunchMenu);

// Route to edit a lunch menu
router.put('/:menu_id', verifyAdmin, editLunchMenu);

// Route to delete a lunch menu
router.delete('/:menu_id', verifyAdmin, deleteLunchMenu);

// Route to get all lunch menus
router.get('/', getAllLunchMenus);

module.exports = router;
