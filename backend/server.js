require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const connect_DB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const app = express();

//* Middlewares
app.use(express.json());
app.use(cookieParser());


//* Define Routes
app.use("/api/auth", authRoutes);

//* Connected DB and then Run the server...
connect_DB()
    .then(() => {
        const PORT = process.env.PORT || 3001;
        //* Run Server
        app.listen(PORT, () => {
            console.log(`The server is Running on PORT ${PORT}`);
        })
    })
    .catch(err => console.log("Failed to Run the server..!", err));