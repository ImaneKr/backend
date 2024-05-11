const { Guardian, Staff } = require('../models/models'); // Import the Guardian model
const bcrypt = require("bcrypt");

async function createGuardian(req, res) {
    try {
        // Check if the user creating the account is a secretary or admin
        /*  const { role } = req.Staff; // Assuming user's role is stored in req.user.role
          if (role !== 'secretary' && role !== 'admin') {
              return res.status(403).json({ error: 'Unauthorized' });
          }*/

        const { firstname,
            lastname,
            gender,
            username,
            guardian_pwd,
            civilState,
            email,
            phone_number,
            address,
            acc_pic } = req.body;

        const guardian = await Guardian.create({
            firstname,
            lastname,
            gender,
            username,
            guardian_pwd,
            civilState,
            email,
            phone_number,
            address,
            acc_pic,
            acc_active: true
        });
        console.log(guardian.guardian_pwd);
        return res.status(201).json(guardian);
    } catch (error) {
        console.error('Error creating guardian:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

async function editGuardian(req, res) {
    try {
        const { guardian_id } = req.params;
        const { firstname, lastname, gender, username, guardian_pwd, civilstate, email, phone_number, address, acc_pic } = req.body;
        let guardian = await Guardian.findByPk(guardian_id);
        if (!guardian) {
            return res.status(404).json({ error: 'Guardian not found' });
        }

        guardian = await guardian.update({
            firstname: firstname,
            lastname: lastname,
            gender: gender,
            username: username,
            guardian_pwd: guardian_pwd,
            civilState: civilstate,
            email: email,
            phone_number: phone_number,
            address: address,
            acc_pic: acc_pic
        });

        return res.status(200).json(guardian);
    } catch (error) {
        console.error('Error editing guardian:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

async function getAllGuardians(req, res) {
    try {
        const guardians = await Guardian.findAll();

        return res.status(200).json(guardians);
    } catch (error) {
        console.error('Error fetching all guardians:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

async function getGuardianById(req, res) {
    try {
        const { id } = req.params;
        const guardian = await Guardian.findByPk(id);
        if (!guardian) {
            return res.status(404).json({ error: 'Guardian not found' });
        }
        return res.status(200).json(guardian);
    } catch (error) {
        console.error('Error fetching guardian by ID:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

async function deleteGuardian(req, res) {
    try {
        const { guardian_id } = req.params;
        const guardian = await Guardian.findByPk(guardian_id);
        if (!guardian) {
            return res.status(404).json({ error: 'Guardian not found' });
        }
        await guardian.destroy();
        return res.status(204).send();
    } catch (error) {
        console.error('Error deleting guardian:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = { createGuardian, editGuardian, getAllGuardians, getGuardianById, deleteGuardian };