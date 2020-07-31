require("express-async-errors");
const Joi = require("joi");
const winston = require("winston");
require("winston-mongodb");
const error = require("./middleware/error");
const config = require("config");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const express = require("express");

const app = express();
require("./startup/routes")(app);

process.on("uncaughtException", (ex) => {
  console.log("Uncaught ");
  winston.error(ex.message, ex);
});
if (!config.get("jwtPrivateKey")) {
  console.error("FATAL error jwtprivate key not defined");
  process.exit(1);
}

mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
