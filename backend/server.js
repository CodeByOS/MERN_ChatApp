require("dotenv").config();
const express = require("express");
const connect_DB = require("./config/db");

const app = express();

//* Middlewares
app.use(express.json());


//* Define Routes


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