const {Event,EventList} = require('../models/models');


// Controller function to create a new event
const createEvent = async (req, res) => {
  try {
    // Check if the user making the request is authorized (admin or secretary)
    if (req.user.role !== 'admin' && req.user.role !== 'secretary') {
      return res.status(403).json({ error: 'Unauthorized access' });
    }

    const { event_name, event_desc, event_date } = req.body;

    // Create event in the database
    const event = await Event.create({
      event_name,
      event_desc,
      event_date
    });

    // Respond with the created event object
    res.status(201).json(event);
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ error: 'Failed to create event' });
  }
};

// Controller function to get all events
const getAllEvents = async (req, res) => {
  try {
    // Fetch all events from the database
    const events = await Event.findAll();

    // Respond with the list of events
    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
};

// Controller function to create an event list entry
const createEventListEntry = async (req, res) => {
  try {
    // Check if the user making the request is authorized (admin or secretary)
    if (req.user.role !== 'admin' && req.user.role !== 'secretary') {
      return res.status(403).json({ error: 'Unauthorized access' });
    }

    const { eventId } = req.params;
    const { accept, decline } = req.body;

    // Create event list entry in the database
    const eventListEntry = await EventList.create({
      event_id: eventId,
      accept,
      decline
    });

    // Respond with the created event list entry
    res.status(201).json(eventListEntry);
  } catch (error) {
    console.error('Error creating event list entry:', error);
    res.status(500).json({ error: 'Failed to create event list entry' });
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  createEventListEntry
};
