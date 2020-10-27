const path = require("path");
const socketio = require("socket.io");
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = socketio(server);
const cors = require("cors");
const port = 5000;

let rooms = {
  defaultRoom: {
    users: [],
  },
  cmpe165: {
    users: [],
  },
};

// app.use(express.static(path.join(__dirname, "build")));
app.use(cors());

app.get("/", (req, res) => {
  // res.sendFile(path.join(__dirname, "build", "index.html"));
  res.send("Hello World");
});

// Creates new room
app.post("/new", (req, res) => {
  const { roomName } = req.body;

  if (roomName === undefined) {
    return res.sendStatus(400);
  }

  rooms[roomName] = { users: [] };
  return res.sendStatus(201);
});

// Simply checks if a room with that name exists
app.get("/exists/:roomName", (req, res) => {
  const { roomName } = req.params;
  if (rooms[roomName] === undefined) {
    return res.sendStatus(404);
  } else {
    return res.sendStatus(200);
  }
});

io.on("connection", (socket) => {
  const roomName = socket.handshake.query.roomName;
  if (roomName === undefined || rooms[roomName] === undefined) {
    console.error("Room name not specified or DNE");
    socket.disconnect();
    return;
  }

  // Joins socket to specified room name
  socket.join(roomName, () => {
    io.to(roomName).emit("new user", "New person has entered the room");
  });

  console.log(`User connecting to room '${roomName}'`);

  // Listen for 'text change' messages and forward
  // them to everyone else in the same room
  socket.on("text change", (newText) => {
    socket.to(roomName).broadcast.emit("text change", newText);
  });

  socket.on("language change", (newLang) => {
    socket.to(roomName).broadcast.emit("language change", newLang);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
