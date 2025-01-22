const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    reps: {
      type: Number,
      required: true,
    },
    load: {
      type: Number,
      required: true,
    },
    user_id: {
      //This user id is used when a user A is logged in he has to see his workouts only // now every workout id has to have this user id
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Workout", workoutSchema);
