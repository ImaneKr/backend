const express = require('express');
const router = express.Router();
const { createLunchMenu, editLunchMenu, deleteLunchMenu, getAllLunchMenus } = require('../controllers/lunchmenu');


const { verifyToken, verifyAdmin, verifySecretary, verifyAdminOrSecretary } = require('../middlewares/verifyToken');
router.use(verifyToken);

// Route to create a lunch menu
router.post('/',verifyToken, verifyAdminOrSecretary, createLunchMenu);

// Route to edit a lunch menu
router.put('/:menu_id', verifyToken, verifyAdminOrSecretary, editLunchMenu);

// Route to delete a lunch menu
router.delete('/:menu_id', verifyToken, verifyAdminOrSecretary, deleteLunchMenu);

// Route to get all lunch menus
router.get('/', verifyToken, verifyAdminOrSecretary, getAllLunchMenus);

module.exports = router;
