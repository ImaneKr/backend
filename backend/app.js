const express = require('express');
const sequelize = require('./config/db');
const cors = require('cors'); // Import db.js
const guardianRouter = require('./routes/guardian');
const staffRoute = require('./routes/staff');
const authRoute = require('./routes/authentication');
const dummyRoute = require('./routes/dummyRoutes');
const cookieParser = require('cookie-parser');
//const { Guardian } = require('./models/models');
const kidRouter = require('./routes/kid');
const eventRouter = require('./routes/event');
const timetableRouter = require('./routes/timeTable');
const announcementRouter = require('./routes/announcement');
/*const paymentRouter = require('./routes/payment');
const lunchMenuRouter = require('./routes/lunchmenu');
const evaluatioRouter = require('./routes/evaluation');*/

const bcrypt = require('bcrypt');
// Initialize Express app
const app = express();
app.use(cors());

// Define port
const PORT = process.env.PORT || 3001;

// Define middleware
app.use(express.json()); // Parse JSON request bodies
app.use(cookieParser());

// Define routes
app.use('/guardian', guardianRouter);
app.use('/staff', staffRoute);
app.use('/login', authRoute);
app.use('/create', dummyRoute);
app.use('/kid', kidRouter);
app.use('/event', eventRouter);
app.use('/announcement', announcementRouter);
app.use('/timetable', timetableRouter);
/*app.use('/lunchmenu', lunchMenuRouter);
app.use('/payment', paymentRouter);
app.use('/evaluation', evaluatioRouter);*/

// Define a function to start the server

async function startServer() {
    try {
        // Sync the database with the models and establish a connection
        await sequelize.authenticate();
        console.log('Connection to database has been established successfully.');

        // Start the Express server
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error starting server:', error);
        // Ensure graceful shutdown in case of an error
        process.exit(1);
    }
}

// Call the function to start the server
startServer();
