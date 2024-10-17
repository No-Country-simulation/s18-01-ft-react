const Rooms = require('../persistencia/models/rooms.models');
const User = require('../persistencia/models/user.models');
const socketAuth = require("../middlewares/socketAuth.js")

const handleSocketEvents = (io) => {
io.use(socketAuth);
io.on('connection', (socket) => {
    const user = socket.user; 

    User.findByIdAndUpdate(user._id, { status: 'online', socketId: socket.id });

    io.emit('userStatusUpdate', { userId: user._id, status: 'online' });

    socket.on('joinRoom', async ({ roomId }) => {
        const room = await Rooms.findById(roomId);
        if (!room) return;

        const previousRooms = [...socket.rooms];
        previousRooms.forEach((room) => {
            if (room !== socket.id) {
                socket.leave(room);
                io.to(room).emit('userLeft', { username: user.username, userId: user._id });
            }
        });

        socket.join(roomId);
        console.log(`${user.username} se ha unido a la sala ${roomId}.`);

        const previousRoom = await Rooms.findOneAndUpdate(
            { "users.socketId": socket.id },
            { $pull: { users: { socketId: socket.id } } },
            { new: true }
        );

        if (previousRoom) {
            io.to(previousRoom._id).emit('userList', previousRoom.users);
        }

        room.users.push({ socketId: socket.id, username: user.username, status: 'online' });
        await room.save();

        io.to(roomId).emit('userList', room.users);
    });

    socket.on('updatePosition', ({ x, y , prevDirection,direction}) => {
        const roomId = [...socket.rooms][1]; 

        if (roomId) {
            io.to(roomId).emit('userMoved', {
                userId: user._id,
                x: x,
                y: y,
                prevDirection: prevDirection, 
                direction: direction,
            });
        }
    });

    socket.on('disconnect', async () => {
        console.log(`${user.username} desconectado.`);

        await User.findByIdAndUpdate(user._id, { status: 'disconnected' });

        io.emit('userStatusUpdate', { userId: user._id, status: 'disconnected' });

        const room = await Rooms.findOneAndUpdate(
            { "users.socketId": socket.id },
            { $pull: { users: { socketId: socket.id } } },
            { new: true }
        );

        if (room) {
            io.to(room._id).emit('userList', room.users);
        }
    });
});
}
module.exports = { handleSocketEvents };