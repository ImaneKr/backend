const Announcement = require('../models/models');

// Controller function to create a new announcement
const createAnnouncement = async (req, res) => {
  try {
    // Check if the user making the request is authorized (admin or secretary)
    if (req.user.role !== 'admin' && req.user.role !== 'secretary') {
      return res.status(403).json({ error: 'Unauthorized access' });
    }

    const { announcement_title, announcement_desc } = req.body;

    // Create announcement in the database
    const announcement = await Announcement.create({
      announcement_title,
      announcement_desc
    });

    // Respond with the created announcement object
    res.status(201).json(announcement);
  } catch (error) {
    console.error('Error creating announcement:', error);
    res.status(500).json({ error: 'Failed to create announcement' });
  }
};

// Controller function to get all announcements
const getAllAnnouncements = async (req, res) => {
  try {
    // Fetch all announcements from the database
    const announcements = await Announcement.findAll();

    // Respond with the list of announcements
    res.status(200).json(announcements);
  } catch (error) {
    console.error('Error fetching announcements:', error);
    res.status(500).json({ error: 'Failed to fetch announcements' });
  }
};

module.exports = {
  createAnnouncement,
  getAllAnnouncements
};
