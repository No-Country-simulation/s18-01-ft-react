import { io } from 'socket.io-client';

// Establecer la conexión con el servidor Socket.io
const socket = io('http://localhost:8080', {
  extraHeaders: {
    cookie:
      'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzExNDA4ZDhmYzUyY2Q5YzU2MGRkODAiLCJpYXQiOjE3Mjk4Nzg5MTEsImV4cCI6MTcyOTk2NTMxMX0.7_0hI89K2uGSDW_9VhtUYEjxlej90ZEDhb_Xn6nbpu0',
  },
});

console.log('Intentando conectar...');

// Escuchar el evento 'connect' para verificar si la conexión se ha establecido
socket.on('connect', () => {
  console.log('Conectado al servidor Socket.io');

  // Intentar unirse a una sala
  socket.emit('joinRoom', { roomId: '67181d679a264b394d1f5925' });
});

// Manejar errores de conexión
socket.on('connect_error', error => {
  console.error('Error de conexión:', error.message); // Mostrar mensaje de error si la autenticación falla
});

// Escuchar cuando un usuario se une a una sala (si la autenticación es exitosa)
socket.on('userJoined', data => {
  console.log(`${data.username} se unió a la sala`);
});

// Escuchar cualquier actualización de estado de usuario
socket.on('userStatusUpdate', data => {
  console.log(`El estado del usuario ${data.userId} ha cambiado a ${data.status}`);
});
