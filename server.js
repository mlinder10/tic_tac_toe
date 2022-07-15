const express = require("express");
const path = require("path");
const http = require("http");
const PORT = process.env.PORT || 3000;
const socketio = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, "public")));

server.listen(PORT, () => {
  console.log("server running on port " + PORT);
});

const player1 = { connected: false };
const player2 = { connected: false };

io.on("connection", (socket) => {
  if (!player1.connected) {
    player1.connected = true;
    socket.emit("player-data", 1);
  } else if (!player2.connected) {
    player2.connected = true;
    socket.emit("player-data", 2);
  } else socket.emit("player-data", 0);

  socket.on("space", (index) => {
    socket.broadcast.emit("space", index);
  });

  socket.on("disconnect", () => {
    if (player2.connected) player2.connected = false;
    else if (player1.connected) player1.connected = false;
  });
});
