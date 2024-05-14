const { Event, EventList, Staff } = require('../models/models');

const createEvent = async (req, res) => {
  let event_desc = "abc"
  try {
    const { event_name, event_date, event_image } = req.body;

    // Check if the event date is in the future
    const currentDate = new Date();
    const isFutureEvent = new Date(event_date) > currentDate;

    const event = await Event.create({
      event_name: event_name,
      event_date: event_date,
      event_image: event_image,
      event_desc: event_desc,
      published: isFutureEvent // Set published to true if the event date is in the future
    });

    res.status(201).json(event);
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ error: 'Failed to create event' });
  }
};


const editEvent = async (req, res) => {
  try {
    let event_desc = "abc"
    const { event_id, event_name, event_date, event_image, published } = req.body;

    let event = await Event.findByPk(event_id);

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    event.event_name = event_name;
    event.event_desc = event_desc;
    event.event_date = event_date;
    event.event_image = event_image;
    event.published = published;

    await event.save();

    res.status(200).json(event);
  } catch (error) {
    console.error('Error editing event:', error);
    res.status(500).json({ error: 'Failed to edit event' });
  }
};

const deleteEvent = async (req, res) => {
  try {

    const { event_id } = req.params;

    const event = await Event.findByPk(event_id);

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    await event.destroy();

    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ error: 'Failed to delete event' });
  }
};

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.findAll();

    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
};

const createEventListEntry = async (req, res) => {
  try {
    /* if (req.Staff.role !== 'admin' && req.Staff.role !== 'secretary') {
       return res.status(403).json({ error: 'Unauthorized access' });
     }*/

    const { eventId } = req.params;
    const { accept, decline } = req.body;

    const kid = await Kid.findOne({ where: { guardian_id: userId } });

    if (!kid) {
      return res.status(404).json({ error: 'Kid not found for the user' });
    }

    const eventListEntry = await EventList.create({
      event_id: eventId,
      kid_id: kid.kid_id,
      accept,
      decline
    });

    res.status(201).json(eventListEntry);
  } catch (error) {
    console.error('Error creating event list entry:', error);
    res.status(500).json({ error: 'Failed to create event list entry' });
  }
};


module.exports = {
  createEvent,
  editEvent,
  deleteEvent,
  getAllEvents,
  createEventListEntry
};
