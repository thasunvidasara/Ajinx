const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const fs = require('fs');


server.listen(3000, function () {
  console.log("Listening on port");
});

var total = 0;

console.log('system running!')
var param = "style";
 app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
io.on("connection", (socket) => {
  socket.broadcast.emit("messageRedirect", "User connected to the server");
var you = "you";
  socket.on("name", (arg, callback) => {
    socket.broadcast.emit("nameRedirect", arg);
    socket.emit("nameRedirect", you);
  })
  socket.on("myRoom", (arg, responce) => {
    socket.join(arg);
    let lovelyMessage = "Hi! Your in room" + " " + arg;
    io.to(arg).emit("messageRedirect", lovelyMessage);
  })
  var socketId = socket.id;
  socket.emit("Id", socketId, (responce) => {
      console.log(responce);
  })
  socket.on("message", function(data){

    var room = data.room;
    var message = data.message;

   socket.broadcast.to(room).emit("messageRedirect", message);
    socket.emit("messageRedirectToClient", message);
  //messageRedirectToClient kiyana eka aawama wena li ekak create wenna daanawa eeke styles edit karaganna
    //wadee hariiiiiii.... room.html wala messageRedirectTOClient kiyana ekee element ekta styles daaganna
  });
})
