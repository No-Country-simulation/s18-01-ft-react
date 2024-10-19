const Rooms = require('../persistencia/models/rooms.models.js');
const Emp = require('../persistencia/models/emp.models.js')

exports.createRoom = async (req, res) => {
    try {
        const { name } = req.body;
        const empresa = req.empresa; // La empresa ya está disponible desde el middleware

        // Validación: Verificar si la empresa está disponible y verificada
        // if (!empresa || !empresa.isVerified) {
		if (!empresa) {
            return res.status(403).json({
                message: 'Acceso denegado. La empresa no está verificada.',
            });
        }

        // Validación: Verificar si se proporcionó el nombre de la room
        if (!name || name.trim() === '') {
            return res.status(400).json({
                message: 'El nombre de la room es obligatorio.',
            });
        }

        // Crear la nueva room
        const newRoom = new Rooms({
            id_emp: empresa._id,
            name: name.trim(),
        });

        // Guardar la room en la base de datos
        const savedRoom = await newRoom.save();
        return res.status(201).json(savedRoom);
    } catch (error) {
        console.error('Error creando la room:', error);
        return res.status(500).json({
            message: 'Error creando la room',
            error: error.message,
        });
    }
};

exports.getRooms = async (req, res) => {
    try {
        // Obtener todas las rooms de la base de datos
        const rooms = await Rooms.find();

        // Verificar si hay salas disponibles
        if (!rooms || rooms.length === 0) {
            return res.status(404).json({
                message: 'No se encontraron salas.',
            });
        }

        // Enviar las salas encontradas
        return res.status(200).json(rooms);
    } catch (error) {
        console.error('Error obteniendo las salas:', error);
        return res.status(500).json({
            message: 'Error interno del servidor al obtener las salas.',
            error: error.message,
        });
    }
};