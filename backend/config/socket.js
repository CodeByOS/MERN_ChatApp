const { Server } = require("socket.io");
const http = require("http");
const express = require("express");

const app = express();
const server = http.createServer(app);

// ! Socket.io setup
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
    },
})

const getReceiverSocketId = (userId) => {
    return userSocketMap[userId]; // Get the socketId for the userId from the userSocketMap
}

//* Used to store online users
const userSocketMap = {}; // { userId: socketId }


//! Listen for incoming connections
io.on("connection", (socket) => {
    console.log("User Connected Successfully", socket.id);

    const userId = socket.handshake.query.userId; // Get userId from the socket handshake query

    if (userId) {
        // Store the socketId for the userId in the userSocketMap
        userSocketMap[userId] = socket.id;
        console.log("User Socket Map:", userSocketMap);
    }

    //* io.emit() is used to send events to all connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap)); // Emit the online users to all clients

    socket.on("disconnect", () => {
        console.log("User Disconnected..!", socket.id);
        delete userSocketMap[userId]; // Remove the userId from the userSocketMap
        io.emit("getOnlineUsers", Object.keys(userSocketMap)); // Emit the updated online users to all clients
    })
})

module.exports = {
    io,
    app,
    server,
    getReceiverSocketId
}