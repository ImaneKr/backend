const express = require('express');
const router = express.Router();
const { createLunchMenu, editLunchMenu, deleteLunchMenu, getAllLunchMenus } = require('../controllers/lunchmenu');


const { verifyToken, verifyAdmin, verifySecretary } = require('../middlewares/verifyToken');
router.use(verifyToken);

// Route to create a lunch menu
router.post('/',verifyAdmin, verifySecretary, createLunchMenu);

// Route to edit a lunch menu
router.put('/:menu_id', verifyAdmin, verifySecretary, editLunchMenu);

// Route to delete a lunch menu
router.delete('/:menu_id', verifyAdmin, verifySecretary, deleteLunchMenu);

// Route to get all lunch menus
router.get('/', verifyAdmin, verifySecretary, getAllLunchMenus);

module.exports = router;
