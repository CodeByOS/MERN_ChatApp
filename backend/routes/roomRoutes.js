const express = require('express');
const { createRoom, getRooms, getRoomById, deleteRoom } = require('../controllers/roomControllers');

const router = express.Router();

// Route to create a new room
router.post('/', createRoom);

// Route to get all rooms
router.get('/', getRooms);

// Route to get a specific room by ID
router.get('/:id', getRoomById);

// Route to delete a room by ID
router.delete('/:id', deleteRoom);

module.exports = router;