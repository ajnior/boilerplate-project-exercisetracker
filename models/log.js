const { Schema, model } = require("mongoose");

const logSchema = new Schema({
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
    default: new Date().toDateString(),
  },
});

const Log = model("Log", logSchema);

module.exports = Log;
