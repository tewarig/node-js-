const EventEmitter = require("events");
const emitter = new EventEmitter();

//Register a event
emitter.on("Messaged Logged", function () {
  console.log("Listener Called");
});

emitter.emit("Message Logged");
//emit means making noice or emmit something
//making singnal event has happen
