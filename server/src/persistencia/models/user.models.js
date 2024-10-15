const mongoose = require('mongoose');
const providerSchema = require('./provider.models');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: false
    },
    authId: { 
        type: String, 
        required: false
    },
    firstName: { 
        type: String,
        required: false 
    },
    lastName: { 
        type: String, 
        required: false 
    },
    password: {
        type: String,
        required: true
    },
    socketId: {
        type: String,
        default : "",
        required: false
    },
    profilePicture: {
    type: String,
    default: 'https://res.cloudinary.com/ddvbwaedm/image/upload/v1729026786/hxerl0iycrhtxbk8vak9.jpg' // Imagen por defecto
    },
    email: {
        type: String,
        required: true
    },
    id_emp: {
        type: String,
        default: "",
        required: false
    },
    rol: {
        type: String,
        required: false
    },
    status: { 
        type: String,
        enum: ['active', 'disconnected'] }
},
    { timestamps: true }
)
const User = mongoose.model('User', userSchema);
module.exports = User;