const Timetable = require('../models/models');

// Controller function to create a new timetable entry
const createTimetableEntry = async (req, res) => {
  try {
    
    const { category_id, subject_name, day_of_week, start_time, end_time, duration } = req.body;

    // Create timetable entry in the database
    const timetableEntry = await Timetable.create({
      category_id: '',
      subject_name,
      day_of_week,
      start_time,
      end_time,
      duration
    });

    // Respond with the created timetable entry object
    res.status(201).json(timetableEntry);
  } catch (error) {
    console.error('Error creating timetable entry:', error);
    res.status(500).json({ error: 'Failed to create timetable entry' });
  }
};

// Controller function to get all timetable entries
const getAllTimetableEntries = async (req, res) => {
  try {
    // Fetch all timetable entries from the database
    const timetableEntries = await Timetable.findAll();

    // Respond with the list of timetable entries
    res.status(200).json(timetableEntries);
  } catch (error) {
    console.error('Error fetching timetable entries:', error);
    res.status(500).json({ error: 'Failed to fetch timetable entries' });
  }
};

module.exports = {
  createTimetableEntry,
  getAllTimetableEntries
};
