const fs = require("fs");

//sync approach
// const files = fs.readdirSync("./");
// console.log(files);

//async approach
fs.readdir("./", function (err, files) {
  //only one of err or file will have value.. others will not have vALUE
  if (err) console.log("Error", err);
  else console.log("Result", files);
});
