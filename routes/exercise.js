const router = require("express").Router();

router.get("/new-user", (req, res) => {
  res.send("handle new user");
});

module.exports = router;
