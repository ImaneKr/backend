const express = require('express');
const sequelize = require('./config/db');
const cors = require('cors');
const ngrok = require("@ngrok/ngrok");
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
const eventListRouter = require('./routes/eventList');
const paymentRouter = require("./routes/payment");
const evaluatioRouter = require('./routes/evaluations');
const notifRouter = require('./routes/notification');
const logger = require('./utils/logger'); // Import the logger

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// Define routes
app.use('/guardian', guardianRouter);
app.use('/staff', staffRoute);
app.use('/auth', authRoute);
app.use('/create', dummyRoute);
app.use('/kid', kidRouter);
app.use('/event', eventRouter);
app.use('/announcement', announcementRouter);
app.use('/timetable', timetableRouter);
app.use('/category', categoryRouter);
app.use('/lunchmenu', lunchMenuRouter);
app.use('/eventlist', eventListRouter);
app.use("/payment", paymentRouter);
app.use('/evaluation', evaluatioRouter);
app.use('/notification', notifRouter);

// Not found route
app.use((req, res) => {
  logger.warn('Route not found!');
  res.status(404).json({ message: 'Not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error('An error occurred!', err);
  res.status(err.status || 500).json({ error: err.message });
});

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("Connection to database has been established successfully.");

    app.listen(PORT, "0.0.0.0", () =>
      console.log(`Express server live at http://localhost:${PORT}`)
    );
    ngrok
      .connect({
        addr: PORT,
        authtoken: process.env.NGROK_AUTH_TOKEN,
        domain: process.env.NGROK_DOMAIN,
      })
      .then((listener) =>
        console.log(`Ingress established at: ${listener.url()}`)
      )
      .catch((err) => console.log("Error occurred: " + err));
  } catch (error) {
    console.error("Error starting server:", error);

    process.exit(1);
  }
}

startServer();
