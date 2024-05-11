const { Kid, Guardian, Category, Staff } = require('../models/models');

async function createKidProfile(req, res) {
    try {
        const { guardianId, firstname, lastname, dateOfbirth, gender, allergies, hobbies, profilePic, syndromes, authorizedpickups } = req.body;

        const age = calculateAge(new Date(dateOfbirth));

        let category_id;
        if (age < 3) {
            const categoryB = await Category.findOne({ where: { category_name: 'B' } });
            if (categoryB) {
                category_id = categoryB.category_id;
            } else {
                return res.status(500).json({ error: 'Category B not found' });
            }
        } else {
            const categoryA = await Category.findOne({ where: { category_name: 'A' } });
            if (categoryA) {
                category_id = categoryA.category_id;
            } else {
                return res.status(500).json({ error: 'Category A not found' });
            }
        }

        const kidProfile = await Kid.create({
            guardian_id: guardianId,
            firstname: firstname,
            lastname: lastname,
            dateOfbirth: dateOfbirth,
            gender: gender,
            allergies: allergies,
            hobbies: hobbies,
            profile_pic: profilePic,
            syndromes: syndromes,
            authorizedpickups: authorizedpickups,
            category_id: category_id, // Assign the calculated category_id
            active: true,
        });

        return res.status(201).json(kidProfile);
    } catch (error) {
        console.error('Error creating KidProfile:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

// Utility function to calculate age
function calculateAge(birthDate) {
    const today = new Date();
    const dob = new Date(birthDate);
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
    }
    return age;
}

async function editKidProfile(req, res) {
    try {
        const { id } = req.params;
        const { firstname, lastname, dateOfbirth, allergies, hobbies, authorizedpickups, syndromes } = req.body;

        let kidProfile = await Kid.findByPk(id);
        if (!kidProfile) {
            return res.status(404).json({ error: 'KidProfile not found' });
        }

        kidProfile = await kidProfile.update({
            firstname: firstname,
            lastname: lastname,
            dateOfbirth: dateOfbirth,
            allergies: allergies,
            hobbies: hobbies,
            authorizedpickups: authorizedpickups,
            syndromes: syndromes,
        });

        return res.status(200).json(kidProfile);
    } catch (error) {
        console.error('Error editing KidProfile:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

async function deleteKidProfile(req, res) {
    try {
        const { id } = req.params;

        const kidProfile = await Kid.findByPk(id);
        if (!kidProfile) {
            return res.status(404).json({ error: 'KidProfile not found' });
        }

        await kidProfile.destroy();

        return res.status(204).end();
    } catch (error) {
        console.error('Error deleting KidProfile:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

async function getAllKidProfiles(req, res) {
    try {
        const allKidProfiles = await Kid.findAll({
            include: [{
                model: Guardian,
                attributes: ['guardian_id', 'firstname', 'lastname', 'email'] // Include only necessary guardian attributes
            }]
        });

        return res.status(200).json(allKidProfiles);
    } catch (error) {
        console.error('Error fetching all kid profiles:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

async function getKidProfileById(req, res) {
    try {
        const { id } = req.params;

        const kidProfile = await Kid.findByPk(id, {
            include: [{
                model: Guardian,
                attributes: ['guardian_id', 'firstname', 'lastname', 'email'] // Include only necessary guardian attributes
            }]
        });

        if (!kidProfile) {
            return res.status(404).json({ error: 'KidProfile not found' });
        }

        return res.status(200).json(kidProfile);
    } catch (error) {
        console.error('Error fetching KidProfile by ID:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

async function getKidsByGuardianId(req, res) {
    try {
        const { guardianId } = req.params;

        const kids = await Kid.findAll({
            where: {
                guardian_id: guardianId
            }
        });

        return res.status(200).json(kids);
    } catch (error) {
        console.error('Error fetching kids by Guardian ID:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    createKidProfile,
    editKidProfile,
    deleteKidProfile,
    getAllKidProfiles,
    getKidProfileById,
    getKidsByGuardianId
};