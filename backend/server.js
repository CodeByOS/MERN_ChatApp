require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const connect_DB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const messageRoutes = require("./routes/messageRoutes");

const cors = require("cors");


const { app, server } = require("./config/socket");

//* Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))


//* Define Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

//* Connect DB and then Run the server
connect_DB()
    .then(() => {
        const PORT = process.env.PORT || 3001;
        server.listen(PORT, () => {
            console.log(`The server is Running on PORT ${PORT}`);
        });
    })
    .catch(err => console.log("Failed to Run the server..!", err));