const express = require("express");
const router = express.Router();

const courses = [
  {
    id: 1,
    name: "course1 ",
  },
  {
    id: 2,
    name: "course2",
  },
  {
    id: 3,
    name: "course3",
  },
];

router.get("/", (req, res) => {
  res.send(courses);
});
router.post("/", (req, res) => {
  //making schema for input validation....
  const { error } = validateCourse(req.body); //object destructure .

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  //always validate the name

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

//req.params => for query objects
router.get("/:id", (req, res) => {
  //using inbuilt functions in javascript
  let course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).send("404 not found");
  } else {
    res.send(course);
  }
});

// app.put("api/courses/:id", (req, res) => {
//   //loook up the course
//   // ..if existing course, return 404
//   let course = courses.find((c) => c.id === parseInt(req.params.id));
//   if (!course) {
//     res.status(404).send("404 not found");
//   }
//   // validate the test
//   //   const result = validateCourse(req.body);

//   const { error } = validateCourse(req.body); //object destructure .

//   if (error) {
//     res.status(400).send(result.error.details[0].message);
//     return;
//   }

//   //return 404 - Bad request
//   //update the course
//   course.name = req.body.name;
//   res.send(course);
//   //return to the client
// });
router.put(":id", (req, res) => {
  let course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).send("404 not found");
  } else {
    res.send(course);
  }

  const { error } = validateCourse(req.body); //object destructure .

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  //update the course
  course.name = req.body.name;
  res.send(course);
  //return updated course to the client
});

router.delete("/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The genre with the given ID was not found.");

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});

//port
//export PORT=5000

function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  return Joi.validate(course, schema);
}

module.exports = router;
