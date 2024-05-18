const express = require("express");
const sequelize = require("./config/db");
const cors = require("cors");
const ngrok = require("@ngrok/ngrok");
const cookieParser = require("cookie-parser");
const guardianRouter = require("./routes/guardian");
const staffRoute = require("./routes/staff");
const authRoute = require("./routes/authentication");
const kidRouter = require("./routes/kid");
const eventRouter = require("./routes/event");
const timetableRouter = require("./routes/timeTable");
const announcementRouter = require("./routes/announcement");
const paymentRouter = require("./routes/payment");
/*
const lunchMenuRouter = require('./routes/lunchmenu');
const evaluatioRouter = require('./routes/evaluation');*/

const bcrypt = require("bcrypt");
// Initialize Express app
const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

// Define middleware
app.use(express.json());
app.use(cookieParser());

// Define routes
/*app.use('/guardian', guardianRouter);
app.use('/staff', staffRoute);
app.use('/auth', authRoute);
app.use('/kid', kidRouter);*/
//app.use('/event', eventRouter);
//app.use('/announcement', announcementRouter);
//app.use('/timetable', timetableRouter);
/*app.use('/lunchmenu', lunchMenuRouter);

app.use('/evaluation', evaluatioRouter);*/

app.use("/payment", paymentRouter);

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