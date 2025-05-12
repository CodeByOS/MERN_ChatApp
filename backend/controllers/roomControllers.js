const Room = require('../models/Room');

const createRoom = async (req, res) => {
    try {
        const { name, description, capacity } = req.body;

        // Validate input
        if (!name || !description || !capacity) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Create a new room
        const newRoom = await Room.create({ name, description, capacity });

        res.status(201).json(newRoom);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

const getRooms = async (req, res) => {
    try {
        const rooms = await Room.find();
        res.status(200).json(rooms);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

const getRoomById = async (req, res) => {
    try {
        const roomId = req.params.id;
        const room = await Room.findById(roomId);
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }
        res.status(200).json(room);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}
const deleteRoom = async (req, res) => {
    try {
        const roomId = req.params.id;
        const room = await Room.findByIdAndDelete(roomId);
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }
        res.status(200).json({ message: 'Room deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

module.exports = {
    createRoom,
    getRooms,
    getRoomById,
    deleteRoom
}