const { LunchMenu } = require('../models/models');
const createError = require("../utils/error");





const createLunchMenu = async (req, res, next) => {
  try {
    let meal_name = 'Lunch'
    const { day_of_week, item1_name, item1_image_url, item2_name, item2_image_url, item3_name, item3_image_url, item4_name, item4_image_url } = req.body;

    // Create lunch menu in the database
    const lunchMenu = await LunchMenu.create({
      day_of_week,
      meal_name: meal_name,
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
//// add one item to the meal of the specified day

const addMealItem = async (req, res, next) => {
  try {
    const { day_of_week, item_name, item_image_url } = req.body;

    let lunchMenu = await LunchMenu.findOne({ where: { day_of_week } });

    if (!lunchMenu) {
      return next(createError(404, 'Lunch menu not found for the specified day'));
    }

    // Check if there's space for more items (up to 4)
    if (lunchMenu.item4_name !== null) {
      return res.status(400).json({ error: 'The lunch menu for this day is already full' });
    }

    // Determine which item slot to fill based on existing items
    let itemSlot = null;
    if (lunchMenu.item1_name === null) {
      itemSlot = 'item1';
    } else if (lunchMenu.item2_name === null) {
      itemSlot = 'item2';
    } else if (lunchMenu.item3_name === null) {
      itemSlot = 'item3';
    } else if (lunchMenu.item4_name === null) {
      itemSlot = 'item4';
    }

    // Update the lunch menu with the new item
    lunchMenu[itemSlot + '_name'] = item_name;
    lunchMenu[itemSlot + '_image_url'] = item_image_url;

    await lunchMenu.save();

    res.status(200).json(lunchMenu);
  } catch (error) {
    console.error('Error adding meal item to lunch menu:', error);
    next(createError(500, 'Failed to add meal item to lunch menu'));
  }
};

// Controller function to edit a lunch menu
const editLunchMenu = async (req, res, next) => {
  try {

    let meal_name = "Lunch"
    const { menu_id, day_of_week, item1_name, item1_image_url, item2_name, item2_image_url, item3_name, item3_image_url, item4_name, item4_image_url } = req.body;


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
  createLunchMenu,
  editLunchMenu,
  addMealItem,
  deleteLunchMenu,
  getAllLunchMenus
};
