const createError = require('../utils/error');
const { Guardian, Staff } = require('../models/models');
const bcrypt = require("bcrypt");
const { generateToken } = require('../middlewares/generateToken'); 
const { verifyToken } = require('../middlewares/verifyToken');
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

    const passwordMatch = await bcrypt.compare(guardian_pwd, guardian.guardian_pwd);

    if (!passwordMatch) {
      return next(createError(401, "Username or password incorrect!"));
    }

    // Generate and return a token without a role
    const token = await generateToken(guardian);
    res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });
    res.json({ token, message: 'Login successful' });
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

    const passwordMatch = await bcrypt.compare(staff_pwd, staff.staff_pwd);

    if (!passwordMatch) {
      return next(createError(401, "Username or password incorrect!"));
    }

    // Generate and return a token with the STAFF's role
    const token = await generateToken({ id: staff.id, username: staff.username, role: staff.role });
    res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });
    res.json({ token, message: 'Login successful' });
  } catch (error) {
    console.error('Error logging for Staff:', error);
    return next(createError(500, "Error logging in!"));
  }
};



const logout = async (req, res, next) => {
  try {
    // Get the token from the cookie or headers
    const decoded = await verifyToken(req, res, next);

    // Clear token cookie
    res.clearCookie('token', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });

    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Error logging out:', error);
    return next(createError(500, 'Error logging out!'));
  }
};

module.exports = {
  login_get,
  guardianLogin,
  staffLogin,
  logout,
};