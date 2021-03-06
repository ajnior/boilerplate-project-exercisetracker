const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: { type: String, required: [true, "username is required"] },
  log: { type: Schema.Types.ObjectId, ref: "Log" },
});

const User = model("User", userSchema);

module.exports = User;
