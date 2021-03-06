const path = require("path");
const socketio = require("socket.io");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const http = require("http");
const cors = require("cors");
const server = http.createServer(app);
const io = socketio(server);
const port = process.env.NODE_ENV === "development" ? 5000 : 8080;

let rooms = {
  defaultRoom: {
    count: 0,
    participants: {},
  },
  cmpe165: {
    count: 0,
    participants: {},
  },
};

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  // res.sendFile(path.join(__dirname, "build", "index.html"));
  res.send("Hello World");
});

// Creates new room
app.post("/new", (req, res) => {
  // If no body or roomName was passed in, return error code
  if (req.body === undefined || req.body.roomName === undefined) {
    console.log("No name or body");
    return res.sendStatus(400);
  }

  const { roomName } = req.body;

  // If room already exists, return
  if (rooms[roomName] !== undefined) {
    return res.sendStatus(201);
  }

  // Create room
  rooms[roomName] = {
    count: 0,
    participants: {},
  };

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
  const displayName = socket.handshake.query.displayName;
  if (roomName === undefined || rooms[roomName] === undefined) {
    console.error("Room name not specified or DNE");
    socket.disconnect();
    return;
  }

  // Joins socket to specified room name
  socket.join(roomName, () => {
    // Add socket id to participant list of this room
    const list = rooms[roomName].participants;
    list[socket.id] = {
      displayName: displayName,
      color: "red",
      cursorPos: {
        line: 0,
        ch: 0,
      },
    };

    // Increment the number of people seen in this room
    rooms[roomName].count++;

    // Have all other clients update their participant list
    io.to(roomName).emit("list change", list);
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

  // Listen for 'canvas change' messages and forward
  // them to everyone else
  socket.on("canvas change", (newDrawing) => {
    socket.to(roomName).broadcast.emit("canvas change", newDrawing);
  });

  socket.on("cursor change", (data) => {
    socket.to(roomName).broadcast.emit("cursor change", data);
  });

  // TODO: Delete from user list when someone leaves
  socket.on("disconnect", () => {
    // Remove socket id from participant list
    const list = rooms[roomName].participants;
    delete list[socket.id];

    // Have all other clients update their participant list
    socket.to(roomName).emit("list change", list);

    // If there are no more people in the room, delete the room
    // rooms[roomName].count--;
    // if (roomName[roomName].count <= 0) {
    // delete rooms[roomName];
    // }
    console.log("User disconnected");
  });
});

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
