// kidProfileController.js
const { Kid, Guardian, Category, Staff } = require('../models/models');

// Create KidProfile only if Guardian exists
async function createKidProfile(req, res) {
    try {
        // Extract necessary data from request body
        const { guardianId, firstname, lastname, dateOfbirth, gender, allergies, hobbies, profilePic, syndromes, authorizedpickups } = req.body;

        // Calculate the age of the child
        const age = calculateAge(new Date(dateOfbirth));

        // Determine the category based on age
        let category_id;
        if (age < 3) {
            // Fetch the category_id for category_name 'B'
            const categoryB = await Category.findOne({ where: { category_name: 'B' } });
            if (categoryB) {
                category_id = categoryB.category_id;
            } else {
                // Handle if category 'B' doesn't exist
                return res.status(500).json({ error: 'Category B not found' });
            }
        } else {
            // Fetch the category_id for category_name 'A'
            const categoryA = await Category.findOne({ where: { category_name: 'A' } });
            if (categoryA) {
                category_id = categoryA.category_id;
            } else {
                // Handle if category 'A' doesn't exist
                return res.status(500).json({ error: 'Category A not found' });
            }
        }

        // Create KidProfile
        const kidProfile = await Kid.create({
            guardian_id: guardianId, // Associate with the guardian_id from the request
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

// Edit KidProfile
async function editKidProfile(req, res) {
    try {
        const { id } = req.params;
        const { firstname, lastname, dateOfbirth, allergies, hobbies, authorizedpickups, syndromes } = req.body;

        // Find KidProfile by id
        let kidProfile = await Kid.findByPk(id);
        if (!kidProfile) {
            return res.status(404).json({ error: 'KidProfile not found' });
        }

        // Update KidProfile
        kidProfile = await kidProfile.update({
            firstname: firstname,
            lastname: lastname,
            dateOfbirth: dateOfbirth,
            allergies: allergies,
            hobbies: hobbies,
            authorizepickups: authorizedpickups,
            syndromes: syndromes,
        });

        return res.status(200).json(kidProfile);
    } catch (error) {
        console.error('Error editing KidProfile:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

// Delete KidProfile
async function deleteKidProfile(req, res) {
    try {
        const { id } = req.params;

        // Find KidProfile by id
        const kidProfile = await Kid.findByPk(id);
        if (!kidProfile) {
            return res.status(404).json({ error: 'KidProfile not found' });
        }

        // Delete KidProfile
        await kid.destroy();

        return res.status(204).end();
    } catch (error) {
        console.error('Error deleting KidProfile:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

// Activate KidProfile (only accessible by secretary or admin)
async function getAllKidProfiles(req, res) {
    try {
        // Fetch all kid profiles along with their associated guardians
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

module.exports = {
    createKidProfile,
    editKidProfile,
    deleteKidProfile,
    getAllKidProfiles
};
