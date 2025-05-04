const mongoose = require("mongoose");
const User = require("../models/User");
const Message = require("../models/Message");
const cloudinary = require("../config/cloudinary");

//* Controller to get all users except the currently logged-in user (for sidebar display)
const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;  //* Get logged-in user's ID from middleware
        
        // Find all users except the logged-in one, and exclude their password field
        const filteredUser = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

        res.status(200).json(filteredUser);
    } catch (err) {
        console.log("Error in getUsersForSidebar..!", err.message);
        res.status(500).json({ message: "Internal Server Error..!" });
    }
}

//* Controller to fetch messages between the logged-in user and another user
const getMessages = async (req, res) => {
    try {
        const { id: otherUserId } = req.params;  //* The user you are chatting with
        const currentUserId = req.user._id;      //* The logged-in user (sender)

        // Find messages where current user is either sender or receiver (2-way chat)
        const messages = await Message.find({
            $or: [
                { senderId: currentUserId, receiverId: otherUserId },
                { senderId: otherUserId, receiverId: currentUserId }
            ]
        }).sort({ createdAt: 1 }); // Sort messages by creation time (oldest first)

        res.status(200).json(messages);
    } catch (err) {
        console.log("Error in getMessage Controller..!", err.message);
        res.status(500).json({ message: "Internal Server Error..!" });
    }
}

//* Controller to send a new message (text and/or image)
const sendMessages = async (req, res) => {
    try {
        const { text, image } = req.body;            //* Get message text and optional image from request
        const { id: receiverId } = req.params;       //* Get receiver's user ID from route parameter
        const senderId = req.user._id;               //* Get sender ID from protected route middleware

        let imgUrl;
        if (image) {
            //* Upload base64 image to Cloudinary and get the secure URL
            const uploadResponse = await cloudinary.uploader.upload(image);
            imgUrl = uploadResponse.secure_url;
        }

        //* Create and save the new message in MongoDB
        const newMessage = await Message.create({
            senderId,
            receiverId,
            text,
            image: imgUrl,  //! This will be undefined if no image is sent
        });

        //! Socket.io --> realtime functionality

        //* Send back the created message as the response
        res.status(201).json(newMessage);

    } catch (err) {
        console.log("Error in sendMessages Controller..!", err.message);
        res.status(500).json({ message: "Internal Server Error..!" });
    }
}

module.exports = {
    getUsersForSidebar,
    getMessages,
    sendMessages
};
