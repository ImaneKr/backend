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

        // Extract kid IDs and names from the acceptances
        const acceptanceList = acceptances.map(acceptance => {
            return {
                kid_id: acceptance.Kid.kid_id,
                firstname: acceptance.Kid.firstname,
                lastname: acceptance.Kid.lastname
            };
        });

        res.status(200).json(acceptanceList);
    } catch (error) {
        console.error('Error fetching event acceptance list:', error);
        res.status(500).json({ error: 'Failed to fetch event acceptance list' });
    }
};
const acceptEvent = async (req, res) => {
    try {
        const eventId = req.params.eventId;
        const kidId = req.body.kidId;

        // Update the acceptance status to true
        await EventList.create({ EventId: eventId, KidId: kidId, accept: true });

        res.status(200).json({ message: 'Event invitation accepted successfully' });
    } catch (error) {
        console.error('Error accepting event invitation:', error);
        res.status(500).json({ error: 'Failed to accept event invitation' });
    }
};

const declineEvent = async (req, res) => {
    try {
        const eventId = req.params.eventId;
        const kidId = req.body.kidId;

        // Check if the event invitation exists for the kid
        const eventInvitation = await EventList.findOne({
            where: {
                EventId: eventId,
                KidId: kidId
            }
        });

        if (!eventInvitation) {
            return res.status(404).json({ error: 'Event invitation not found' });
        }

        // Update the decline status to true
        await eventInvitation.update({ decline: true });

        res.status(200).json({ message: 'Event invitation declined successfully' });
    } catch (error) {
        console.error('Error declining event invitation:', error);
        res.status(500).json({ error: 'Failed to decline event invitation' });
    }
};
module.exports = { declineEvent, acceptEvent, getEventAcceptanceList };    
