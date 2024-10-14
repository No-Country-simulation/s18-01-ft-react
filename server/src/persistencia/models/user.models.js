const mongoose = require('mongoose');
const providerSchema = require('./provider.models');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    socketId: {
        type: String,
        default :""
    },
    email: {
        type: String,
        required: true
    },
    id_emp: {
        type: String,
        default: ""
    },
    rol: {
        type: String,
        default: ""
    },
    status: { 
        type: String,
        enum: ['active', 'disconnected'] }
},
    { timestamps: true }
)
const User = mongoose.model('User', userSchema);
module.exports = User;