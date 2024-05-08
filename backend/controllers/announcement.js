const {Announcement} = require('../models/models');

const createAnnouncement = async (req, res) => {
  try {
   /* if (req.user.role !== 'admin' && req.user.role !== 'secretary') {
      return res.status(403).json({ error: 'Unauthorized access' });
    }*/

    const { announcement_title, announcement_desc, announcement_image } = req.body;

    const announcement = await Announcement.create({
      announcement_title: announcement_title,
      announcement_desc: announcement_desc,
      announcement_image: announcement_image,
      published: true // Set published to true
    });

    res.status(201).json(announcement);
  } catch (error) {
    console.error('Error creating announcement:', error);
    res.status(500).json({ error: 'Failed to create announcement' });
  }
};

const editAnnouncement = async (req, res) => {
  try {
   /* if (req.user.role !== 'admin' && req.user.role !== 'secretary') {
      return res.status(403).json({ error: 'Unauthorized access' });
    }*/

    const { announcement_id, announcement_title, announcement_desc, announcement_image, published } = req.body;

    let announcement = await Announcement.findByPk(announcement_id);

    if (!announcement) {
      return res.status(404).json({ error: 'Announcement not found' });
    }

    announcement.announcement_title = announcement_title;
    announcement.announcement_desc = announcement_desc;
    announcement.announcement_image = announcement_image;
    announcement.published = published;

    await announcement.save();

    res.status(200).json(announcement);
  } catch (error) {
    console.error('Error editing announcement:', error);
    res.status(500).json({ error: 'Failed to edit announcement' });
  }
};

const unpublishAnnouncement = async (req, res) => {
  try {
   /* if (req.user.role !== 'admin' && req.user.role !== 'secretary') {
      return res.status(403).json({ error: 'Unauthorized access' });
    }*/

    const { announcement_id } = req.params;

    let announcement = await Announcement.findByPk(announcement_id);

    if (!announcement) {
      return res.status(404).json({ error: 'Announcement not found' });
    }

    announcement.published = false;

    await announcement.save();

    res.status(200).json({ message: 'Announcement unpublished successfully' });
  } catch (error) {
    console.error('Error unpublishing announcement:', error);
    res.status(500).json({ error: 'Failed to unpublish announcement' });
  }
};

const getAllAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.findAll();

    res.status(200).json(announcements);
  } catch (error) {
    console.error('Error fetching announcements:', error);
    res.status(500).json({ error: 'Failed to fetch announcements' });
  }
};

module.exports = {
  createAnnouncement,
  editAnnouncement,
  unpublishAnnouncement,
  getAllAnnouncements
};
