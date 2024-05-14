const { Guardian, Staff } = require('../models/models');
const verifyAdmin = require('../middlewares/verifyToken')

async function createStaff(req, res) {
  try {
    let salary;
    const { firstname, lastname, username, role, staff_pic, phone_number, email, staff_pwd } = req.body;
    if (role == 'teacher') {
      salary = 50000;
    } else if(role == 'secretary') {
      salary = 45000;
    }else if (role === 'admin') {
      salary = 70000;
    } else {
      return res.status(400).json({ error: 'Invalid role' });
    }
    // Create the guardian account
    const staff = await Staff.create({
      firstname: firstname,
      lastname: lastname,
      username: username,
      role: role,
      staff_pic: staff_pic,
      phone_number: phone_number,
      email: email,
      salary: salary,
      staff_pwd: staff_pwd,
    });
    return res.status(201).json(staff);
  } catch (error) {
    console.error('Error creating staff:', error);
    return res.status(500).json({ error: 'Failed to create staff account' });
  }
}
// Controller function to delete a staff account
async function deleteStaff(req, res) {
  try {
    const { id } = req.params;

    const deletedStaff = await Staff.destroy({ where: { staff_id: id } });

    if (deletedStaff === 0) {
      return res.status(404).json({ error: 'Staff not found' });
    }

    res.status(200).json({ message: 'Staff deleted successfully' });
  } catch (error) {
    console.error('Error deleting staff:', error);
    res.status(500).json({ error: 'Failed to delete staff account' });
  }
};

async function editStaff(req, res) {
  try {
    const { id } = req.params;
    const {
      firstname,
      lastname,
      username,
      role,
      staff_pic,
      phone_number,
      email,
      salary,
      staff_pwd
    } = req.body;

    const [updated] = await Staff.update(
      {
        firstname,
        lastname,
        username,
        role,
        staff_pic,
        phone_number,
        email,
        salary,
        staff_pwd
      },
      { where: { staff_id: id } }
    );

    if (updated === 0) {
      return res.status(404).json({ error: 'Staff not found' });
    }

    res.status(200).json({ message: 'Staff updated successfully' });
  } catch (error) {
    console.error('Error updating staff:', error);
    res.status(500).json({ error: 'Failed to update staff account' });
  }
};
async function getAllStaff(req, res) {
  try {
    // Fetch all staff from the database
    const allStaff = await Staff.findAll();

    if (allStaff.length === 0) {
      return res.status(404).json({ error: 'No staff found' });
    }

    // Return the array of staff
    res.status(200).json(allStaff);
  } catch (error) {
    console.error('Error fetching all staff:', error);
    res.status(500).json({ error: 'Failed to fetch staff' });
  }
};

module.exports = {
  createStaff,
  deleteStaff,
  editStaff,
  getAllStaff
};