const { Guardian, Staff } = require('../models/models');
const bcrypt = require('bcrypt')
const verifyAdmin = require('../middlewares/verifyToken')


const hashPassword = async (plainPassword) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw new Error('Error hashing password');
  }
};

async function createStaff(req, res) {
  try {
    let salary;
    const { firstname, lastname, username, role, staff_pic, phone_number, email, staff_pwd } = req.body;
    if (role == 'teacher') {
      salary = 50000;
    } else if (role == 'secretary') {
      salary = 45000;
    } else if (role === 'admin') {
      salary = 70000;
    } else {
      return res.status(400).json({ error: 'Invalid role' });
    }
    //hash the password 
    const hashedPassword = await hashPassword(staff_pwd)
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
      staff_pwd: hashedPassword,
    });
    return res.status(201).json(staff);
  } catch (error) {
    console.error('Error creating staff:', error);
    return res.status(500).json({ error: 'Failed to create staff account' });
  }
}
async function getStaffById(req, res) {
  try {
    const { staff_id } = req.params;
    const staff = await Staff.findByPk(staff_id);
    if (!staff) {
      return res.status(404).json({ error: 'Staff not found' });
    }
    return res.status(200).json(staff);
  } catch (error) {
    console.error('Error fetching staff by ID:', error);
    return res.status(500).json({ error: 'Internal server error' });
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
    const { staff_id } = req.params;
    const {firstname,lastname,username,role,staff_pic,phone_number,email,salary,staff_pwd} = req.body;
    // hash the paswword agian 
    const hashedPassword = await hashPassword(staff_pwd)

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
        staff_pwd : hashedPassword
      },
      { where: { staff_id: staff_id } }
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
  getAllStaff,
  getStaffById
};