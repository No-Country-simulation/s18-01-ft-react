const jwt = require('jsonwebtoken');
const Emp = require('../persistencia/models/emp.models.js');
const dotenv = require('dotenv').config();

const socketAuth = (socket, next) => {
    const cookie = socket.handshake.headers.cookie;
    console.log(cookie);
    
    if (cookie) { 
        const token= cookie.split('; ')
            .find(row => row.startsWith('token='))
            .split('=')[1];
        console.log(token);
        
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) return next(new Error('Autenticación fallida'));
            console.log(decoded);
            
            const user = await Emp.findById(decoded.empId);
            if (!user) return next(new Error('Usuario no encontrado'));

            socket.user = user; 
            next(); 
        });
    } else {
        next(new Error('No autenticado'));
    }
};

module.exports = socketAuth;