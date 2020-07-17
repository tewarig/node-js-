var url = "http://mylogger.io/log";

console.log(__filename);
console.log(__dirname);

function log(message) {
  //send logger request

  console.log(message);
}

//exporting a single function
module.exports = log;
//exporting a object which can do multiple  work
module.exports.endPoint = url;
