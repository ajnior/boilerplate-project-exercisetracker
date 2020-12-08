const { Schema, model } = require("mongoose");

const exerciseLogSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: [true, "userId is required"],
  },
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
    default: new Date(),
  },
});

const ExerciseLog = model("ExerciseLog", exerciseLogSchema);

module.exports = ExerciseLog;
