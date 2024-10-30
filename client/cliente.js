import { io } from 'socket.io-client';

// Establecer la conexión con el servidor Socket.io
const socket = io('http://localhost:8080', {
  extraHeaders: {
    cookie:
      'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzExNjRmOTZmMDU4M2ZhNTlmNjZmOTgiLCJpYXQiOjE3MzAyNDM0ODIsImV4cCI6MTczMDMyOTg4Mn0.luPm9Nhw4nwMsMyHE_HRTnvUq7wH3qipuCC_GeDFCTU',
  },
});

socket.on('connect', () => {
  console.log('Conectado al servidor Socket.io');

  // Intentar unirse a una sala
  //console.log('1');
  socket.emit('joinRoom', { roomId: '671bdf85fecacf58b1ac7d5e', x: 300, y: 500 });
});

// Manejar errores de conexión
socket.on('connect_error', error => {
  console.error('Error de conexión:', error.message); // Mostrar mensaje de error si la autenticación falla
});
//console.log('1');
// Escuchar cuando un usuario se une a una sala (si la autenticación es exitosa)
socket.on('userList', data => {
  console.log(data, 'lista');
});
socket.on('newUserJoined', data => {
  console.log(data, 'nuevo');
});
socket.on('userLeft', data => {
  console.log('Usuario dejó la sala:', data);
});

socket.on('userCountUpdate', data => {
  console.log(data, 'salida');
});
setTimeout(() => {
  socket.emit('updatePosition', {
    x: 0,
    y: 0,
    direction: '',
    prevDirection: '',
  });
}, 20 * 1000);
// Escuchar cualquier actualización de estado de usuario
socket.on('userStatusUpdate', data => {
  console.log(`El estado del usuario ${data.userId} ha cambiado a ${data.status}`);
});
