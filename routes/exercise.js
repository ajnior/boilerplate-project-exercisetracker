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

    let user = await User.findOne({ _id: userId });
    const { _id, username } = user;

    /* Sets date to null, because null is a valid Date type for mongoose and does't trigger default value */
    if (!date) {
      date = undefined;
    }

    const exerciseLog = {
      exercise: {
        description,
        duration,
        date,
      },
    };

    const responseObj = {
      _id,
      username,
      date,
      duration,
      description,
    };

    if (user.log) {
      let log = await Log.findByIdAndUpdate(
        { _id: user.log },
        {
          $push: { exercise: exerciseLog.exercise },
        },
        { new: true }
      );

      const last = log.exercise.length - 1;
      const { date } = log.exercise[last];

      return res.json({ ...responseObj, date });
    }

    let newLog = new Log(exerciseLog);
    newLog = await newLog.save();

    const last = newLog.exercise.length - 1;
    const newLogDate = newLog.exercise[last].date;

    user = await User.findByIdAndUpdate({ _id: userId }, { log: newLog._id });

    res.json({ ...responseObj, date: newLogDate });
  } catch (e) {
    res.send(e);
  }
});

module.exports = router;
