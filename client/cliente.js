import { io } from 'socket.io-client';

const socket = io('http://localhost:8080'); // Cambia a la URL de tu servidor

socket.on('connect', () => {
  console.log('Conectado al servidor');

  // Unirse a una sala
  socket.emit('joinRoom', { username: 'tu_nombre', name: 'sala1' });
});

// Escuchar cuando un usuario se une a la sala
socket.on('userJoined', data => {
  console.log(`${data.username} se unió a la sala`);
});
