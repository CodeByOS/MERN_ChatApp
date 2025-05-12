const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        capacity: {
            type: Number,
            required: true,
        },
        users: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        messages: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Message',
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;