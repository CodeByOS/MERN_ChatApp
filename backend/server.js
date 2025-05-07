require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const connect_DB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const messageRoutes = require("./routes/messageRoutes");

const cors = require("cors");
const app = express();

const http = require("http");
const { Server } = require("socket.io")

//* Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))


//* Define Routes
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

//* Connected DB and then Run the server...
connect_DB()
    .then(() => {
        const PORT = process.env.PORT || 3001;
        //* Create HTTP server
        const server = http.createServer(app);

        //* Starting to initial Socket.io server
        const io = new Server(server, {
            cors: {
                origin: "http://localhost:5173",
                credentials: true,
            }
        })

        //* Socket.io logic
        io.on('connection', (socket) => {
            console.log("User Connected", socket.id);

            socket.on("disconnect", () => {
                console.log("User Disconnected", socket.id);
            })
        })

        //* Run Server
        server.listen(PORT, () => {
            console.log(`The server is Running on PORT ${PORT}`);
        })
    })
    .catch(err => console.log("Failed to Run the server..!", err));