require("dotenv").config({ override: true });

const path = require("path");
const express = require("express");
const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());
app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Origin",
    "https://portfolio-test-dg.herokuapp.com"
  );
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use(express.static(path.join(__dirname, "build")));

app.use("/route", require("./api/route"));

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}`));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
