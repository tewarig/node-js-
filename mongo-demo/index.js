const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to Mongodb...."))
  .catch((err) => console.error("could not connect to mongodb", err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

const Course = mongoose.model("Course", courseSchema);
//for more control over sting search use regular expression
async function createCourse() {
  const course = new Course({
    name: "Angular COurse",
    author: "Someone",
    tags: ["Angular", "FrontEnd"],
    isPublished: true,
  });

  const result = await course.save();
  console.log(result);
}
//comparision operators
//eq(equal)
//ne(not equal )
//gt (greaten then)
//gte (greater than not equal to)
//it(less then)
//lte (less then equal to)
//in
//nin(not in)

//logical operators
//or
//and

async function getCourses() {
  //implemeting pagination
  const pageNumber = 2;
  const pageSize = 10;

  const Courses = await Course.find({ isPublished: true })
    // .skip((pageNumber - 1) * pageSize)
    // .limit(pageSize)

    //if it starts with  ^
    // .find({ author: /^Someone/ });
    //use doallar sign to find how it ends...
    //.find ({author: /^tewari/})
    // to find a word somewhere in the middle  + for case insensitive put i at end
    // .find ({author : /.*find me if you can.*/i})

    // .find({ price: { $gte: 10 } })
    // .find({ price: { $in: [10, 15, 20] } })
    .or([{ author: "something" }, { isPublished: true }]);
  // .and()
  //   .limit(10)
  // .sort({ name: -1 })
  // .select({ name: 1, tags: 1 });
  //to find number of documents... use
  // .count();
  console.log(Courses);
}
getCourses();
