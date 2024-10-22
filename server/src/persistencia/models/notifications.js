const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    type: {
        type: String,
        enum: ['message','other'], 
        required: true
    },
    Titel: {
        type: String,
        default : "Notificacion"
    },
    message: {
        type: String,
        required: true
    },
    link: {  
        type: String
    },
    isRead: {
        type: Boolean,
        default: false 
    },
    createdAt: {
        type: Date,
        default: Date.now 
    },
});

module.exports = mongoose.model('Notification', notificationSchema);