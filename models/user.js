const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  userName: { type: String, required: "userName is required" },
});

const User = model("User", userSchema);

module.exports = User;
