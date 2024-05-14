const express = require('express');
const router = express.Router();
const lunchMenuController = require('../controllers/lunchmenu');

// POST request to create a new lunch menu
router.post('/', lunchMenuController.createLunchMenu);

// PUT request to edit a lunch menu
router.put('/:menu_id', lunchMenuController.editLunchMenu);

// POST request to add a meal item to a lunch menu
router.post('/add-item', lunchMenuController.addMealItem);

// DELETE request to delete a lunch menu
router.delete('/:menu_id', lunchMenuController.deleteLunchMenu);

// GET request to fetch all lunch menus
router.get('/', lunchMenuController.getAllLunchMenus);

module.exports = router;
