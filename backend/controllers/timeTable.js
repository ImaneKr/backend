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
  const { entries } = req.body;  // Expecting an array of timetable entries

  try {
    const updatePromises = entries.map(async (entry) => {
      const { category_id, day_of_week, start_time, subject_name, end_time, duration } = entry;

      // Find the existing timetable entry by category_id, day_of_week, and start_time
      const existingEntry = await Timetable.findOne({
        where: {
          category_id,
          day_of_week,
          start_time
        }
      });

      if (existingEntry) {
        // Update the existing entry
        existingEntry.subject_name = subject_name;
        existingEntry.end_time = end_time;
        existingEntry.duration = duration;

        // Save the changes
        await existingEntry.save();
      } else {
        // If no existing entry is found, create a new one
        await Timetable.create({
          category_id,
          day_of_week,
          start_time,
          subject_name,
          end_time,
          duration
        });
      }
    });

    // Wait for all update/create operations to complete
    await Promise.all(updatePromises);

    res.status(200).json({ message: 'Timetable entries updated successfully' });
  } catch (error) {
    console.error('Error updating timetable entries:', error);
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

