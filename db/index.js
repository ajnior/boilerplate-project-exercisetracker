require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log("DB has been connected...");
  } catch (e) {
    console.log("Problem connecting with mongoDB", e);
  }
};

module.exports = connectDB;
