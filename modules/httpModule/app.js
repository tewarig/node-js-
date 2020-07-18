const http = require("http");
// const { Socket } = require("dgram");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("Hello World");
    res.end();
  }
  if (req.url === "/api") {
    res.write(JSON.stringify([1, 2, 3, 4, 56, 69, 420]));
    res.end();
  }
});

// server.on("connection", (socket) => {
//   console.log("New connection............");
// });
server.listen(3000);
console.log("Server jumping on port 3000 ");
