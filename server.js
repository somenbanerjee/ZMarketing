const express = require("express");
const morgan = require("morgan");

// dotenv config
const dotenv = require("dotenv");
dotenv.config();

// Mysql Database Connection
require("./config/database");


// rest Object
const app = express();

// port
const port = process.env.PORT || 8080;

// middleware
app.use(express.json());
app.use(morgan("dev"));

//routes
const userRoutes = require("./routes/userRoutes");

app.use("/api/v1/user", userRoutes);

// listen
app.listen(port, () => {
  console.log(
    `server is running on ${process.env.APP_MODE} Mode with PORT: ${port}`
  );
});
