// config/db.js

const { Sequelize } = require('sequelize');

// Load environment variables if using dotenv
require('dotenv').config();

// Initialize Sequelize with database credentials
const sequelize = new Sequelize(process.env.NAME, process.env.USER, process.env.DB_PASSWORD, {
  host: process.env.HOST,
  port: process.env.PORT,
  dialect: 'mysql', // Change this to match your database dialect
  logging: false // Disable logging of SQL queries (optional)
});

module.exports = sequelize;
