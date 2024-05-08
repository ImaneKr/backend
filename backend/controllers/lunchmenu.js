const { LunchMenu } = require('../models/models');
const createError = require("../utils/error");


const { verifyAdmin, verifySecretary } = require("../middleware/auth");


const createLunchMenu = async (req, res, next) => {
  try {
    
    const role = req.user.role;
    if (role !== 'admin' && role !== 'secretary') {
      return next(createError(403, 'Unauthorized access'));
    }

    const { day_of_week, meal_name, item1_name, item1_image_url, item2_name, item2_image_url, item3_name, item3_image_url, item4_name, item4_image_url } = req.body;

    // Create lunch menu in the database
    const lunchMenu = await LunchMenu.create({
      day_of_week,
      meal_name,
      item1_name,
      item1_image_url,
      item2_name,
      item2_image_url,
      item3_name,
      item3_image_url,
      item4_name,
      item4_image_url
    });

    
    res.status(201).json(lunchMenu);
  } catch (error) {
    console.error('Error creating lunch menu:', error);
    next(createError(500, 'Failed to create lunch menu'));
  }
};

// Controller function to edit a lunch menu
const editLunchMenu = async (req, res, next) => {
  try {
    // Verify if the user making the request is authorized (admin or secretary)
    const role = req.user.role;
    if (role !== 'admin' && role !== 'secretary') {
      return next(createError(403, 'Unauthorized access'));
    }

    const { menu_id, day_of_week, meal_name, item1_name, item1_image_url, item2_name, item2_image_url, item3_name, item3_image_url, item4_name, item4_image_url } = req.body;

    
    let lunchMenu = await LunchMenu.findByPk(menu_id);

    if (!lunchMenu) {
      return next(createError(404, 'Lunch menu not found'));
    }

   
    lunchMenu.day_of_week = day_of_week;
    lunchMenu.meal_name = meal_name;
    lunchMenu.item1_name = item1_name;
    lunchMenu.item1_image_url = item1_image_url;
    lunchMenu.item2_name = item2_name;
    lunchMenu.item2_image_url = item2_image_url;
    lunchMenu.item3_name = item3_name;
    lunchMenu.item3_image_url = item3_image_url;
    lunchMenu.item4_name = item4_name;
    lunchMenu.item4_image_url = item4_image_url;

    await lunchMenu.save();

    
    res.status(200).json(lunchMenu);
  } catch (error) {
    console.error('Error editing lunch menu:', error);
    next(createError(500, 'Failed to edit lunch menu'));
  }
};


const deleteLunchMenu = async (req, res, next) => {
  try {
    const role = req.user.role;
    if (role !== 'admin' && role !== 'secretary') {
      return next(createError(403, 'Unauthorized access'));
    }

    const { menu_id } = req.params;

    
    const lunchMenu = await LunchMenu.findByPk(menu_id);

    if (!lunchMenu) {
      return next(createError(404, 'Lunch menu not found'));
    }

    await lunchMenu.destroy();


    res.status(200).json({ message: 'Lunch menu deleted successfully' });
  } catch (error) {
    console.error('Error deleting lunch menu:', error);
    next(createError(500, 'Failed to delete lunch menu'));
  }
};
const getAllLunchMenus = async (req, res) => {
    try {
    
      const lunchMenus = await LunchMenu.findAll();
  
      res.status(200).json(lunchMenus);
    } catch (error) {
      console.error('Error fetching lunch menus:', error);
      res.status(500).json({ error: 'Failed to fetch lunch menus' });
    }
  };
module.exports = {
  createLunchMenu: verifyAdmin(createLunchMenu),
  editLunchMenu: verifyAdmin(editLunchMenu),
  deleteLunchMenu: verifyAdmin(deleteLunchMenu),
  getAllLunchMenus,
};
