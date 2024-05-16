const { Guardian, Staff } = require('../models/models');
const upload = require('../middlewares/multerConfig')


async function createGuardian(req, res) {
    try {
        const { firstname, lastname, gender, username, guardian_pwd, civilState, email, phone_number, address, acc_pic } = req.body;
        // Access the uploaded file

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
            acc_pic: acc_pic ? acc_pic.path : '' // Store the file path in the database
        });

        return res.status(201).json(guardian);
    } catch (error) {
        console.error('Error creating guardian:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

async function editGuardian(req, res) {
    try {
        const { guardian_id } = req.params;
        const { firstname, lastname, gender, username, guardian_pwd, civilstate, email, phone_number, address } = req.body;
        const acc_pic = req.file;
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