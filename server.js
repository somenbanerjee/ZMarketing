const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const con = require("./config/database");

//console.log(connectDB);
// dotenv config
dotenv.config();

// rest Object
const app = express();

// port
const port = process.env.PORT || 8080;

// middleware
app.use(express.json());
app.use(morgan("dev"));

//routes
app.get("/", (req, res) => {
  res.status(200).send({
    message: "home page",
  });
});

con.query("SELECT * FROM movies;", function (err, results, fields) {
  console.log(results); // results contains rows returned by server
  //console.log(fields); // fields contains extra meta data about results, if available
});

// listen
app.listen(port, () => {
  console.log(
    `server is running on ${process.env.APP_MODE} Mode with PORT: ${port}`
  );
});
