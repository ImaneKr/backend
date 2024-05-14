const express = require('express');
const sequelize = require('./config/db');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const guardianRouter = require('./routes/guardian');
const staffRoute = require('./routes/staff');
const authRoute = require('./routes/authentication');
const dummyRoute = require('./routes/dummyRoutes');
const kidRouter = require('./routes/kid');
const eventRouter = require('./routes/event');
const timetableRouter = require('./routes/timeTable');
const announcementRouter = require('./routes/announcement');
const categoryRouter = require('./routes/category');
const lunchMenuRouter = require('./routes/lunchmenu');
/*const paymentRouter = require('./routes/payment');
const evaluatioRouter = require('./routes/evaluation');*/

// Initialize Express app
const app = express();
app.use(cors({
    origin: ['http://localhost:25298', 'http://localhost:3000'],
    credentials: true // If you're using cookies or authorization headers
}));


const PORT = process.env.PORT || 3001;

// Define middleware
app.use(express.json());
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
app.use('/category', categoryRouter);
app.use('/lunchmenu', lunchMenuRouter);
/*app.use('/payment', paymentRouter);
app.use('/evaluation', evaluatioRouter);*/


async function startServer() {
    try {

        await sequelize.authenticate();
        console.log('Connection to database has been established successfully.');


        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error starting server:', error);

        process.exit(1);
    }
}

startServer();
