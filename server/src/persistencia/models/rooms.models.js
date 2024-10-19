const mongoose = require('mongoose');

const roomsSchema = new mongoose.Schema({
    id_emp: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Emp',
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
                enum: ['active',"absent", 'disconnected'],
                default: 'active',
            },
        },
    ],
},
    { timestamps: true }
)
const Rooms = mongoose.model('Rooms', roomsSchema);
module.exports = Rooms;