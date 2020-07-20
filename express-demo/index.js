const startup = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");
const morgan = require("morgan");
const Joi = require("joi");
const express = require("express");
const logger = require("./logger");
const helmet = require("helmet");
const app = express();
const routtesModule = require("./routes/courses");
const homeModule = require("./routes/home");

//setting a template engine
app.set("view engine", "pug");
app.set("views", "./views");

//return a dev. enviroment to the machine
// console.log(`node env : ${process.env.NODE_ENV}`);
// console.log(`env: ${app.get("env")}`);

app.use(express.json());
//urlencoded for taking input from forms  => urlencoded   to take input from form
app.use(express.urlencoded({ extended: true }));
//to send static file use.. static middleware
app.use(express.static("public"));

app.use(logger);

//using middle ware helmet
app.use(helmet());

app.use("/api/courses", routtesModule);
app.use("/", homeModule);
//using morgan middleware to give logs...
//use   export DEBUG=app:startup
if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  startup("Morgan Enabled");
}

//port
//export PORT=5000

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is jumping at port ${port}`);
});
