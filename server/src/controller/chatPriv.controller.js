const PrivateChat = require("../persistencia/models/privMessages.models.js");

// Enviar un mensaje en un chat privado
exports.sendPrivateMessage = async (req, res) => {
	try {
		const { message, senderId } = req.body;
		const { userId1, userId2 } = req.params;

		let chat = await PrivateChat.findOne({
			participants: { $all: [userId1, userId2] },
		});

		if (!chat) {
			chat = new PrivateChat({ participants: [userId1, userId2] });
		}

		chat.messages.push({ senderId, message });
		await chat.save();

		res.status(201).json(chat);
	} catch (error) {
		res.status(500).json({ error: "Error al enviar el mensaje" });
	}
};

// Obtener los mensajes de un chat privado
exports.getPrivateMessages = async (req, res) => {
	try {
		const { userId1, userId2 } = req.params;
		const chat = await PrivateChat.findOne({
			participants: { $all: [userId1, userId2] },
		});

		if (!chat) {
			return res
				.status(404)
				.json({ error: "No hay chat entre estos usuarios" });
		}

		res.status(200).json(chat.messages);
	} catch (error) {
		res.status(500).json({ error: "Error al obtener los mensajes" });
	}
};
