const router = require("express").Router();

const User = require("../models/user");
const Log = require("../models/log");

router.post("/new-user", async (req, res) => {
  try {
    const { username } = req.body;

    const userInDB = await User.findOne({ username }, "username");
    if (userInDB) return res.send("username already taken");

    const newUser = new User({ username });
    await newUser.save();
    res.send(newUser);
  } catch (e) {
    res.send(e);
  }
});

router.get("/users", async (req, res) => {
  try {
    const allUsers = await User.find({}).select("_id username");
    res.send(allUsers);
  } catch (e) {
    res.send(e);
  }
});

router.post("/add", async (req, res) => {
  try {
    let { date } = req.body;
    const { userId, description, duration } = req.body;

    let user = await User.find({ _id: userId });

    if (!date) {
      date = new Date().toDateString();
    }

    const exerciseLog = {
      description,
      duration,
      date,
    };

    if (user.log) {
      let log = await Log.findByIdAndUpdate(
        { _id: userId },
        { log: { $push: exerciseLog } }
      );
      return res.send(log);
    }

    let newLog = new Log(exerciseLog);
    newLog = await newLog.save();

    user = await User.findByIdAndUpdate({ _id: userId }, { log: newLog._id });

    res.send(newLog);
  } catch (e) {
    res.send(e);
  }
});

module.exports = router;
