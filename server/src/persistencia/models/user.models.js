const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    socketId: {
        type: String,
        required: true
    },
    status: { 
        type: String,
        required: true, 
        enum: ['active', 'disconnected'] }
},
    { timestamps: true }
)
const User = mongoose.model('User', userSchema);
module.exports = User;