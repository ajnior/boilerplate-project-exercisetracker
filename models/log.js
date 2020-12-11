const { Schema, model } = require("mongoose");

const ExerciseSchema = new Schema({
  description: {
    type: String,
    required: [true, "exercie description is required"],
  },
  duration: {
    type: Number,
    required: [true, "exercise duration is required"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const LogSchema = new Schema({
  exercise: {
    type: [ExerciseSchema],
  },
});

const Log = model("Log", LogSchema);

module.exports = Log;
