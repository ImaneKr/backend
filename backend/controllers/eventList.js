const { EventList, Kid } = require('../models/models');

const getEventAcceptanceList = async (req, res) => {
    try {
        const eventId = req.params.eventId;

        // Retrieve acceptance list for the event
        const acceptances = await EventList.findAll({
            where: {
                EventId: eventId,
                accept: true
            },
            include: [{
                model: Kid,
                attributes: ['kid_id', 'firstname', 'lastname'] // Include only the id and name of the kid
            }]
        });
      
        res.status(200).json(acceptances);
    } catch (error) {
        console.error('Error fetching event acceptance list:', error);
        res.status(500).json({ error: 'Failed to fetch event acceptance list' });
    }
};

const acceptEvent = async (req, res) => {
    try {
        const eventId = req.params;
        const kidId = req.body.kidId;

        // Update the acceptance status to true
        await EventList.create({ EventId: eventId, KidId: kidId, accept: true, decline: false });

        res.status(200).json({ message: 'Event invitation accepted successfully' });
    } catch (error) {
        console.error('Error accepting event invitation:', error);
        res.status(500).json({ error: 'Failed to accept event invitation' });
    }
};

const declineEvent = async (req, res) => {
    try {
        const eventId = req.params;
        const kidId = req.body.kidId;

        // Update the decline status to true
        await EventList.create({ EventId: eventId, KidId: kidId, accept: false, decline: true });

        res.status(200).json({ message: 'Event invitation declined successfully' });
    } catch (error) {
        console.error('Error declining event invitation:', error);
        res.status(500).json({ error: 'Failed to decline event invitation' });
    }
};
module.exports = { declineEvent, acceptEvent, getEventAcceptanceList };    
