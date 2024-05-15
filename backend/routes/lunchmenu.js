const express = require('express');
const router = express.Router();
const lunchMenuController = require('../controllers/lunchmenu');
const { verifyToken, verifyAdminOrSecretary } = require('../middlewares/verifyToken');

// POST request to create a new lunch menu
router.post('/', verifyToken, verifyAdminOrSecretary ,lunchMenuController.createLunchMenu);

// PUT request to edit a lunch menu
router.put('/:menu_id',verifyToken, verifyAdminOrSecretary , lunchMenuController.editLunchMenu);

// POST request to add a meal item to a lunch menu
router.post('/add-item',verifyToken, verifyAdminOrSecretary , lunchMenuController.addMealItem);

// DELETE request to delete a lunch menu
router.delete('/:menu_id',verifyToken, verifyAdminOrSecretary , lunchMenuController.deleteLunchMenu);

// GET request to fetch all lunch menus
router.get('/', lunchMenuController.getAllLunchMenus);

module.exports = router;
