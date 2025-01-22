require("dotenv").config();

const express = require("express");
const workoutRoutes = require("./routes/workout");
const userRoutes = require("./routes/user");
const mongoose = require("mongoose");

// express app
const app = express();

// middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
app.use(express.json());

// routes
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);

//Connect to DB

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        "Connected to the Database in Mongo And Running in this port : ",
        process.env.PORT
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });
