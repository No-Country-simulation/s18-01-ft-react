const jwt = require('jsonwebtoken');
const User = require('../persistencia/models/user.models.js');
const parseCookie = require('cookie-parser');

const parseCookies = (cookieString) =>
    cookieString
      ?.split(';')
      .map((cookie) => cookie.trim().split('='))
      .reduce((acc, [key, value]) => {
        acc[key] = decodeURIComponent(value);
        return acc;
      }, {});

const socketAuth = async (socket, next) => {
  try {
    const cookie = socket.handshake.headers.cookie;

    if (!cookie) {
      return next(new Error('No autenticado'));
    }

    const cookies = parseCookies(cookie);
    const token = cookies.authToken; // Extrae el token de las cookies

    if (!token) {
      return next(new Error('Token no encontrado'));
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) return next(new Error('Autenticación fallida'));

      const user = await User.findById(decoded.id);
      if (!user) return next(new Error('Usuario no encontrado'));

      socket.user = user; // Guarda el usuario en el socket para futuras operaciones
      next(); // Continua con el siguiente middleware o evento
    });
  } catch (error) {
    next(new Error('Error interno en autenticación'));
  }
};

module.exports = socketAuth;