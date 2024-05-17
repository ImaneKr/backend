const { Category } = require('../models/models');

const getCategoryById = async (req, res) => {
    try {
        const id = req.params.id;
        const category = await Category.findOne({
            where: { category_id: id },
            attributes: ['category_name', 'category_desc', 'category_id']
        });
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        return res.status(200).json(category);
    } catch (error) {
        console.error('Error fetching category by ID:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll({
            attributes: ['category_name', 'category_desc', 'category_id']
        });
        return res.status(200).json(categories);
    } catch (error) {
        console.error('Error fetching all categories:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getCategoryById,
    getAllCategories
};
