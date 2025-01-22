const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");
//Get all workout////////////////////////////////

const getWorkouts = async (req, res) => {
  const user_id = req.user._id; //it gets the workout for logged user only if user A is logged in show him his workout only
  const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 });
  res.status(200).json(workouts);
};

//get a single workout//////////////////////////

const getWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const workout = await Workout.findById(id);
  if (!workout) {
    res.status(404).json({ error: "No such workout " });
  }
  res.status(200).json(workout);
};

//create a new workout///////////////////////////////

const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;

  //Checking the fields of form are empty if its sends a error msg
  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!load) {
    emptyFields.push("load");
  }
  if (!reps) {
    emptyFields.push("reps");
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({
      error: "You Dumb ? fill the fields ",
      emptyFields,
    });
  }

  try {
    const user_id = req.user._id;
    const workout = await Workout.create({ title, load, reps, user_id });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete a workout/////////////////////////////////////

const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }
  const workout = await Workout.findOneAndDelete({ _id: id });

  if (!workout) {
    res.status(404).json({ error: "No such workout " });
  }
  res.status(200).json(workout);
};

//update a workout////////////////////////////////////

const updateWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const workout = await Workout.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!workout) {
    return res
      .status(404)
      .json({ error: "No such workout in order to delete" });
  }
  res.status(200).json(workout);
};

module.exports = {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
};
