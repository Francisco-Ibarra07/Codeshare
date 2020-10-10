const path = require("path");
const socketio = require("socket.io");
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = socketio(server);
const port = 5000;

// app.use(express.static(path.join(__dirname, "build")));

app.get("/", (req, res) => {
  // res.sendFile(path.join(__dirname, "build", "index.html"));
  res.send("Hello World");
});

io.on("connection", (socket) => {
  console.log("a user connected");

  // Listen for 'text change' messages and forward
  // them to everyone else
  socket.on("text change", (newText) => {
    socket.broadcast.emit("text change", newText);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
