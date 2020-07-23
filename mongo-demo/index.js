const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to Mongodb...."))
  .catch((err) => console.error("could not connect to mongodb", err));

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 50 },
  author: String,
  category: {
    type: String,
    required: true,
    enum: ["mobile", "web", "network"],
    lowercase: true,
  },
  tags: {
    type: Array,
    validate: {
      isAsync: true,
      validator: function (v, callback) {
        setTimeout(() => {
          const result = v && v.length > 0;
          callback(result);
        }, 1000);
      },
      message: "A couse should have atleast one tag.",
    },
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    min: 10,
    max: 200,
    get: (v) => Math.round(v),
    set: (v) => Math.round(v),
    required: function () {
      return this.isPublished;
    },
    //you cannot use arrow function here... dude
  },
});

const Course = mongoose.model("Course", courseSchema);
//for more control over sting search use regular expression
async function createCourse() {
  const course = new Course({
    name: "Test COurse",
    author: "Someone like me",
    category: "-",
    tags: ["coolooo"],
    isPublished: true,
    price: 2,
  });

  try {
    // await course.validate();
    const result = await course.save();
    console.log(result);
  } catch (ex) {
    for (field in ex.errors) console.log(ex.errors[field].message);
  }
}
createCourse();
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

async function cool(id) {
  const updateme = await Course.findByIdAndUpdate(id, {
    $set: {
      author: "Gaurav",
      isPublished: false,
    },
  });
  console.log(updateme);
}

async function DeleteOne(id) {
  const delete12 = await Course.deleteOne({ _id: id });
  console.log(delete12);

  //or use deleteMany
  //find by id and remove
}
