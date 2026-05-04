const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

let sockets = [
  { id: 1, name: "Library Socket", status: "Available" },
  { id: 2, name: "Cafe Socket", status: "In Use" },
  { id: 3, name: "Student Hub Socket", status: "Available" }
];

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.emit("socketList", sockets);

  socket.on("updateStatus", (data) => {
    sockets = sockets.map((item) =>
      item.id === data.id ? { ...item, status: data.status } : item
    );

    io.emit("socketList", sockets);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});