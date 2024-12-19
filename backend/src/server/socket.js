const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 4000;

// Socket.IO server with proper CORS configuration
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // React app URL
    methods: ["GET", "POST"],
  },
});

let messagesHistory = [];
let counter = 0;

// Listen for client connections
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.emit("oldMessages", messagesHistory);
  socket.emit("oldCounter", counter);

  // get the data on counter component mount
  socket.on("getOldCounter", () => {
    socket.emit("oldCounter", counter);
  });

  // get the data on messages component mount
  socket.on("getOldMessages", () => {
    socket.emit("oldMessages", messagesHistory);
  });

  // Listen for 'sendMessage' event from the client
  socket.on("sendMessage", (data) => {
    console.log("Message received:", data);

    messagesHistory.push(data);

    // Emit the message to all clients
    io.emit("receiveMessage", data);
  });

  // IncrementCounter
  socket.on("incrementCounter", () => {
    counter++; // Increment the counter
    console.log(`Counter incremented: ${counter}`);
    io.emit("incrementCounterMessage", counter); // Broadcast to all clients
  });

  // Listen for decrementCounter event
  socket.on("decrementCounter", () => {
    counter--; // Decrement the counter
    console.log(`Counter decremented: ${counter}`);
    io.emit("decrementCounterMessage", counter); // Broadcast to all clients
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Socket.IO server running on http://localhost:${PORT}`);
});
