const jwt = require('jsonwebtoken');
const User = require('../persistencia/models/user.models.js');
const parseCookie = require('cookie-parser');

const socketAuth = (socket, next) => {
    const cookie = socket.handshake.headers.cookie;
    
    if (cookie) {
        const token = parseCookie(cookie).authToken; 

        
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) return next(new Error('Autenticación fallida'));

            const user = await User.findById(decoded.id);
            if (!user) return next(new Error('Usuario no encontrado'));

            socket.user = user; 
            next(); 
        });
    } else {
        next(new Error('No autenticado'));
    }
};

module.exports = socketAuth;