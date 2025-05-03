const mongoose = require("mongoose");

const connect_DB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DATABASE is Connected...");
    } catch (err) {
        console.log("Failed to Connect The DATABASE...!", err);
        process.exit(1);
    }
}

module.exports = connect_DB;