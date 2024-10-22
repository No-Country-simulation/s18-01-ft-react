const Rooms = require('../persistencia/models/rooms.models');
const User = require('../persistencia/models/user.models');
const socketAuth = require("../middlewares/socketAuth.js");

const handleSocketEvents = (io) => {
  io.use(socketAuth);

  io.on('connection', (socket) => {
    const user = socket.user; // Usuario autenticado por middleware
    
    // Actualiza estado a 'online' y guarda socketId
    User.findByIdAndUpdate(user._id, { status: 'online', socketId: socket.id }, { new: true })
      .then(() => {
        console.log(`${user.username} se ha conectado.`);
        io.emit('userStatusUpdate', { userId: user._id, status: 'online' });
      })
      .catch(console.error);

    // Unirse a una sala específica
    socket.on('joinRoom', async ({ roomId }) => {
      try {
        const room = await Rooms.findById(roomId);
        if (!room) return;

        // Dejar salas anteriores excepto la propia del socket
        socket.rooms.forEach((room) => {
          if (room !== socket.id) {
            socket.leave(room);
            io.to(room).emit('userLeft', { username: user.username, userId: user._id });
          }
        });

        // Unirse a la nueva sala
        socket.join(roomId);
        console.log(`${user.username} se ha unido a la sala ${roomId}.`);

        // Actualizar usuarios en la sala
        room.users.push({ socketId: socket.id, username: user.username, status: 'online' });
        await room.save();

        io.to(roomId).emit('userList', room.users);
      } catch (error) {
        console.error('Error al unirse a la sala:', error);
      }
    });

    // Actualizar la posición del usuario
    socket.on('updatePosition', ({ x, y, prevDirection, direction }) => {
      const roomId = [...socket.rooms][1]; // Primera sala a la que se unió

      if (roomId) {
        io.to(roomId).emit('userMoved', {
          userId: user._id,
          x,
          y,
          prevDirection,
          direction,
        });
      }
    });
    //cambiuo de estado
    socket.on('changeStatus', async ({ status }) => {
      try {
        await User.findByIdAndUpdate(user._id, { status: status });
        console.log(`${user.username} ha cambiado su estado a ${status}.`);
        io.emit('userStatusUpdate', { userId: user._id, status: status });
      } catch (error) {
        console.error('Error al cambiar el estado:', error);
      }
    });
    // Desconectar al usuario
    socket.on('disconnect', async () => {
      console.log(`${user.username} se ha desconectado.`);

      try {
        // Actualizar estado a 'disconnected'
        await User.findByIdAndUpdate(user._id, { status: 'disconnected', socketId: '' });

        io.emit('userStatusUpdate', { userId: user._id, status: 'disconnected' });

        // Eliminar al usuario de la sala
        const room = await Rooms.findOneAndUpdate(
          { "users.socketId": socket.id },
          { $pull: { users: { socketId: socket.id } } },
          { new: true }
        );

        if (room) {
          io.to(room._id).emit('userList', room.users);
        }
      } catch (error) {
        console.error('Error al manejar desconexión:', error);
      }
    });
  });
};

module.exports = { handleSocketEvents };
