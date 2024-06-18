const createError = require('../utils/error');
const { Guardian, Staff } = require('../models/models');
const { generateToken } = require('../middlewares/generateToken');
const bcrypt = require('bcrypt');

// login Render page
const login_get = (req, res) => {
  // res.render('page');
  res.send("Welcome to Login Page!");
};

// LOGIN GUARDIAN APP
const guardianLogin = async (req, res, next) => {

  const { username, guardian_pwd } = req.body;

  try {
    const guardian = await Guardian.findOne({ where: { username: username } });

    if (!guardian) {
      return next(createError(400, "Guardian not found!"));
    }
    //checks the password validation
    const isPasswordValid = bcrypt.compare(guardian_pwd, guardian.guardian_pwd)

    if (!isPasswordValid) {
      return next(createError(401, "Username or password incorrect!"));
    }
    else {
      console.log("uardian log in successfully");
      return res.status(201).json(guardian);

    }

    // Generate and return a token

  } catch (error) {
    console.error('Error logging for Guardian:', error);
    return next(createError(500, "Error logging in!"));
  }
};

const staffLogin = async (req, res, next) => {
  const { username, staff_pwd } = req.body;

  try {
    const staff = await Staff.findOne({ where: { username: username } });

    if (!staff) {
      return next(createError(400, "Staff not found!"));
    }
    // check the password
    const isPasswordValid = bcrypt.compare(staff_pwd, staff.staff_pwd)
    // Compare passwords directly
    if (!isPasswordValid) {
      return next(createError(401, "Username or password incorrect!"));
    }
    // Generate and return a token
    const token = await generateToken(staff);
    res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });
    res.json({ token, staff, message: 'Login successful' });


  } catch (error) {
    console.error('Error logging for Staff:', error);
    return next(createError(500, "Error logging in!"));
  }
};


const logout_get = (req, res) => {
  res.clearCookie('token');
  res.send("Logged out successfully!");
};

module.exports = {
  login_get,
  guardianLogin,
  staffLogin,
  logout_get,
};
