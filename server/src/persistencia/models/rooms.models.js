const mongoose = require('mongoose');

const roomsSchema = new mongoose.Schema({
    id_propety: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    users: [
        {
            socketId: String,
            username: String,
            status: {
                type: String,
                enum: ['active', 'disconnected'],
                default: 'active',
            },
        },
    ],
},
    { timestamps: true }
)
const Rooms = mongoose.model('Rooms', roomsSchema);
module.exports = Rooms;