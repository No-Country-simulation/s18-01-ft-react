const Rooms = require('../persistencia/models/rooms.models.js');

const createRoom = async (req, res) => {
    const { name, id_propety } = req.body;
    try {
        let room = await Rooms.findOne({ name });
        if (room) {
            return res.status(400).json({ message: 'La sala ya existe' });
        }
        room = new Rooms({ name, id_propety });
        await room.save();
        res.status(201).json({ message: 'Sala creada correctamente', room });
    } catch (err) {
        res.status(500).json({ message: 'Error al crear la sala', error: err.message });
    }
};

const getRooms = async (req, res) => {
    try {
        const rooms = await Rooms.find();
        res.json(rooms);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener las salas', error: err.message });
    }
};

module.exports = {
    createRoom, 
    getRooms 
};