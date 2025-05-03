const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: (value) => validator.isEmail(value),
            message: "Please provide a valid email address",
        }
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    profilePic: {
        type: String,
        default: "",
    }
}, {
    timestamps: true
});


const User = mongoose.model("User", userSchema);

module.exports = User;