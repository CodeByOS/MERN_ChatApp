const User = require("../models/User");
const cloudinary = require("cloudinary");

//* Register new user Controller
const signupUser = async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
        //* Basic field validation
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        //* Password length check
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters!" });
        }

        //* Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists!" });
        }

        //* Create new user
        const newUser = await User.create({ fullName, email, password });
        
        //* Generate JWT Token
        const token = newUser.generateToken();

        //* Set JWT cookie 
        res.cookie("jwt", token, {
            httpOnly: true, // prevents XSS attacks
            secure: process.env.NODE_ENV !== "development", // use secure cookies in production
            sameSite: "strict", // prevents CSRF attacks
            maxAge: 7 * 24 * 60 * 60 * 1000,    // 7 days in ms
        });

        //* Send user info (excluding password)
        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
            profilePic: newUser.profilePic
        });
    } catch (err) {
        console.log("Error in creating User Controller!", err.message);
        res.status(500).json({ message: "Internal Server Error!" });
    }
}

//* Login User Controller
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if(!user) return res.status(400).json({ message: "Invalid Credentials..!" });

        // Check if the entered password matches the hashed password
        const isMatch = await user.matchPassword(password);
        if (!isMatch) return res.status(400).json({ message: "Invalid Credentials!" });

        // Generate JWT Token
        const token = user.generateToken();

        // Set JWT cookie 
        res.cookie("jwt", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
        });

    } catch (err) {
        console.log("Error in login Controller", err.message);
        res.status(500).json({ message: "Internal Server Error..!" });
    }
}

//* Logout User Controller
const logoutUser = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged Out Successfully.." });
    } catch (err) {
        console.log("Error in logout Controller..!", err.message);
        res.status(500).json({ message: "Internal Server Error..!" });
    }
}

//* Update Profile Controller
const updateProfile = async (req, res) => {
    try {
        const { profilePic } = req.body; // Get profilePic from request body
        const userId = req.user._id;    // Get user ID from authenticated user

        // Validate if profilePic is provided
        if(!profilePic) return res.status(400).json({ message: "Profile Picture is required..!" });

        // Upload image to Cloudinary
        const uploadResponse = await cloudinary.uploader.upload(profilePic, { folder: "profile_pics" });

        // Update user document with new profilePic URL
        const updatedUser = await User.findByIdAndUpdate(
            userId, 
            { profilePic: uploadResponse.secure_url }, 
            { new: true }   // Return updated document
        );

        // Send updated user data as response
        res.status(200).json(updatedUser);
    } catch (err) {
        console.log("Error in Update Profile..!", err.message);
        res.status(500).json({ message: "Internal Server Error..!" });
    }
}

//* Check Authenticated User Controller
const checkAuthUser = async (req, res) => {
    try {
        // Send the authenticated user data
        res.status(200).json(req.user);
    } catch (err) {
        console.log("Error in Authentication User Controller..!", err.message);
        res.status(500).json({ message: "Internal Server Error..!" });
    }
}

module.exports = {
    signupUser,
    loginUser,
    logoutUser,
    updateProfile,
    checkAuthUser
};
