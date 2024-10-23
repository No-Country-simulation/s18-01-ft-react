const Message = require("../persistencia/models/messages.models.js");
const parseEmotes = require("../utils/emoteParser.js");

// Enviar un mensaje en una sala
exports.sendMessage = async (req, res) => {
	try {
		let { message, senderId } = req.body;
		const fileUrl = req.file ? `/uploads/${req.file.filename}` : null;

		// Parsear los emotes
		message = parseEmotes(message);

		const newMessage = new Message({
			roomId: req.params.roomId,
			senderId,
			message,
			fileUrl,
		});

		await newMessage.save();
		res.status(201).json(newMessage);
	} catch (error) {
		res.status(500).json({ error: "Error al enviar el mensaje" });
	}
};

// Obtener todos los mensajes de una sala
exports.getMessages = async (req, res) => {
	try {
		const messages = await Message.find({ roomId: req.params.roomId });
		res.status(200).json(messages);
	} catch (error) {
		res.status(500).json({ error: "Error al obtener los mensajes" });
	}
};
