const { Server } = require("socket.io");
const http = require("http");
const express = require("express");

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"]
    }
})

io.on("conenction", (socket) => {
    console.log("User Connected Successfully", socket.id);

    socket.on("disconnect", () => {
        console.log("User Disconnected..!", socket.id);
    })
})

module.exports = {
    io,
    app,
    server
}