const express = require('express');
const router = express.Router();
const { getCategoryById, getAllCategories } = require('../controllers/category');

// Define route to get category by ID
router.get('/:id', getCategoryById);
router.get('/', getAllCategories);

module.exports = router;