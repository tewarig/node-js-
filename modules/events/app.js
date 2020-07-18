const EventEitter = require("events");
const EventEmitter = require("events");
const emitter = new EventEmitter();
//Register a event
emitter.on("message logged", function (arg) {
  //e for envt or event arg
  console.log("Listner Called", arg);
});

emitter.emit("messageLogged", { id: 1, url: "http:/" });
//emit means making noice or emmit something
//making singnal event has happen
