const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const connectDB = require("./db");

const exercise = require("./routes/exercise");

connectDB();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.use("/api/exercise", exercise);

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log(
    `Your app is listening on: http://localhost:${listener.address().port}`
  );
});
