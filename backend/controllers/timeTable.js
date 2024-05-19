const { Timetable } = require('../models/models');


const fetchTimetables = async (req, res) => {
  const { category_id } = req.params;

  try {
    const timetables = await Timetable.findAll({
      where: { category_id },
      order: [['day_of_week', 'ASC'], ['start_time', 'ASC']]
    });

    res.status(200).json(timetables);
  } catch (error) {
    console.error('Error fetching timetables:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
};

// Controller function to create a new timetable entry
const addTimetableEntry = async (req, res) => {
  const { category_id, subject_name, day_of_week, start_time, end_time, duration } = req.body;

  try {
    const newEntry = await Timetable.create({
      category_id,
      subject_name,
      day_of_week,
      start_time,
      end_time,
      duration
    });

    res.status(201).json(newEntry);
  } catch (error) {
    console.error('Error adding timetable entry:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
};

const editTimetableEntry = async (req, res) => {
  const { id } = req.params;
  const { subject_name, day_of_week, start_time, end_time, duration } = req.body;

  try {
    const entry = await Timetable.findByPk(id);

    if (!entry) {
      return res.status(404).json({ message: 'Timetable entry not found' });
    }

    entry.subject_name = subject_name;
    entry.day_of_week = day_of_week;
    entry.start_time = start_time;
    entry.end_time = end_time;
    entry.duration = duration;

    await entry.save();

    res.status(200).json(entry);
  } catch (error) {
    console.error('Error editing timetable entry:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
};
const deleteTimetableEntry = async (req, res) => {
  const { id } = req.params;

  try {
    const entry = await Timetable.findByPk(id);

    if (!entry) {
      return res.status(404).json({ message: 'Timetable entry not found' });
    }

    await entry.destroy();

    res.status(200).json({ message: 'Timetable entry deleted' });
  } catch (error) {
    console.error('Error deleting timetable entry:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
};

module.exports = {
  fetchTimetables,
  addTimetableEntry,
  editTimetableEntry,
  deleteTimetableEntry
}

