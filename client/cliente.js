import { io } from 'socket.io-client';

// No incluir la cookie de autenticación para simular una conexión no autenticada
const socket = io('http://localhost:8080', {
  extraHeaders: {
    // Simular que no envías un token de autenticación o enviar uno inválido
    cookie:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoiNjcxMTRlN2ExN2QwNjBmOWI1OWNiZDhkIn0sImlhdCI6MTcyOTE4NzUzMywiZXhwIjoxNzI5MTkxMTMzfQ.2rIN0ZRmB8GoE_VhmnUbFDUMXy_VMohvefN5JoLKQ7c',
  },
});

socket.on('connect', () => {
  console.log('Conectado al servidor');

  // Intentar unirse a una sala (esto debería fallar si no se está autenticado)
  socket.emit('joinRoom', { roomId: 'sala1' });
});

socket.on('connect_error', error => {
  console.log('Error de conexión:', error.message); // Aquí debería mostrar el mensaje "Autenticación fallida"
});

// Escuchar cuando un usuario se une a la sala (solo debería ocurrir si la autenticación tiene éxito)
socket.on('userJoined', data => {
  console.log(`${data.username} se unió a la sala`);
});
