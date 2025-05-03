const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//* Define the user schema
const userSchema = new mongoose.Schema({
    // Email field with validation
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid email address"],
    },
    // Full name field
    fullName: {
        type: String,
        required: true,
        trim: true,
    },
    // Password field with minimum length
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    // Optional profile picture URL
    profilePic: {
        type: String,
        default: "",
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

//* Pre-save hook to hash the password before saving
userSchema.pre('save', async function (next) {
    // Only hash the password if it has been modified (or is new)
    if(!this.isModified('password')) return next();

    // Hash the password with a salt round of 10
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

//* Password Compare Method
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

//* Generate Token Method
userSchema.methods.generateToken = function () {
    return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
};

//* Create and export the User model
const User = mongoose.model("User", userSchema);

module.exports = User;
