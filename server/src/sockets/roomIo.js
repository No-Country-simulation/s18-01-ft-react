const Rooms = require('../persistencia/models/rooms.models.js');

const handleSocketEvents = (io) => {
    io.on('connection', (socket) => {
        console.log(`Usuario conectado: ${socket.id}`);

        socket.on('joinRoom', async ({ username, name }) => {
            try {
                const room = await Rooms.findOne({ name: name });
                if (!room) {
                    socket.emit('error', { message: `La sala ${name} no existe.` });
                    return;
                }

                room.users.push({ socketId: socket.id, username, status: 'active' });
                await room.save();

                socket.join(name);
                io.to(name).emit('userJoined', { username, status: 'active' });
                io.to(name).emit('roomData', room.users);
            } catch (err) {
                console.error('Error al unirse a la sala:', err);
            }
        });

        socket.on('disconnect', async () => {
            console.log(`Usuario desconectado: ${socket.id}`);
            try {
                const room = await Rooms.findOne({ 'users.socketId': socket.id });
                if (room) {
                    const user = room.users.find((user) => user.socketId === socket.id);
                    if (user) {
                        user.status = 'disconnected';
                        await room.save();

                        io.to(room.name).emit('userLeft', { username: user.username, status: 'disconnected' });
                        io.to(room.name).emit('roomData', room.users);
                    }
                }
            } catch (err) {
                console.error('Error al manejar la desconexión:', err);
            }
        });
    });
};

module.exports = { handleSocketEvents };