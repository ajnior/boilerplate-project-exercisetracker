const router = require("express").Router();

const User = require("../models/user");

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
    const { userId, description, duration, date } = req.body;
  } catch (e) {
    res.send(e);
  }
});

module.exports = router;
