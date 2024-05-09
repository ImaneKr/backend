const createError = require("../utils/error");
const jwt = require('jsonwebtoken');
const { Guardian, Staff } = require('../src/models/models');
const bcrypt = require("bcrypt");


const createDummyTeacher = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    // hash password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);
    const teacher = await Teacher.create({
      username,
      password: hashedPassword,
    });
    res.json({ teacher });
  } catch (err) {
    next(createError(500, "Error creating teacher!"));
  }
};

const createDummySecretary = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    // hash password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);
    const secretary = await Secretary.create({
      username,
      password: hashedPassword,
    });
    res.json({ secretary });
  } catch (err) {
    next(createError(500, "Error creating secretary!"));
  }
};

const createDummyAdmin = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    // hash password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await Admin.create({
      username,
      password: hashedPassword,
    });
    res.json({ admin });
  } catch (err) {
    next(createError(500, "Error creating admin!"));
  }
};
const createDummyGuardian = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    // hash password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);
    const guardian = await Guardian.create({
      username,
      guardian_pwd: hashedPassword,
    });
    return res.status(201).json(guardian);
  } catch (err) {
    next(createError(500, "Error creating guardian"));
  }
};
module.exports = { createDummyTeacher, createDummySecretary, createDummyAdmin, createDummyGuardian };