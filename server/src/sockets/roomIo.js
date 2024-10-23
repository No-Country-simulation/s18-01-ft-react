const Rooms = require("../persistencia/models/rooms.models");
const User = require("../persistencia/models/user.models");
const Notifications = require("../persistencia/models/notifications.models");
const socketAuth = require("../middlewares/socketAuth.js");
const Messages = require("../persistencia/models/messages.models.js");
const PrivateChat = require("../persistencia/models/privMessages.models.js");

const handleSocketEvents = (io) => {
	io.use(socketAuth);

	const userChangeStream = User.watch();

	userChangeStream.on("change", (change) => {
		if (change.operationType === "update") {
			const userId = change.documentKey._id;
			const updatedFields = change.updateDescription.updatedFields;

			if (updatedFields.status) {
				io.emit("userStatusUpdate", {
					userId: userId,
					status: updatedFields.status,
				});
			}
		}
	});

	const notificationChangeStream = Notifications.watch();

	notificationChangeStream.on("change", (change) => {
		if (change.operationType === "insert") {
			const newNotification = change.fullDocument;
			const userId = newNotification.userId;

			io.to(userId).emit("newNotification", newNotification);
		}
	});

	// Change Stream para monitorear mensajes nuevos
	const messageChangeStream = Messages.watch();
	messageChangeStream.on("change", (change) => {
		if (change.operationType === "insert") {
			const newMessage = change.fullDocument;
			const roomId = newMessage.roomId;

			io.to(roomId).emit("newMessage", newMessage);
		}
	});

	// Change Stream para monitorear mensajes nuevos en los chats privados
	const privateChatChangeStream = PrivateChat.watch();

	privateChatChangeStream.on("change", (change) => {
		if (
			change.operationType === "update" &&
			change.updateDescription.updatedFields["messages"]
		) {
			const chatId = change.documentKey._id;
			const newMessage =
				change.updateDescription.updatedFields["messages"].slice(-1)[0]; // Obtener el último mensaje

			const privateChat = change.fullDocument;
			const participants = privateChat.participants;

			// Emitir el nuevo mensaje a ambos participantes
			participants.forEach((participant) => {
				io.to(participant).emit("newPrivateMessage", { chatId, newMessage });
			});
		}
	});

	io.on("connection", (socket) => {
		const user = socket.user;
		User.findByIdAndUpdate(
			user._id,
			{ status: "online", socketId: socket.id },
			{ new: true },
		)
			.then(() => {
				console.log(`${user.username} se ha conectado.`);
				io.emit("userStatusUpdate", { userId: user._id, status: "online" });
			})
			.catch(console.error);

		socket.on("joinRoom", async ({ roomId }) => {
			try {
				const room = await Rooms.findById(roomId);
				if (!room) return;

				socket.rooms.forEach((room) => {
					if (room !== socket.id) {
						socket.leave(room);
						io.to(room).emit("userLeft", {
							username: user.username,
							userId: user._id,
						});
					}
				});

				socket.join(roomId);
				console.log(`${user.username} se ha unido a la sala ${roomId}.`);
				io.to(roomId).emit("userCountUpdate", room.users.length);

				room.users.push({ socketId: socket.id, username: user.username });
				await room.save();

				io.to(roomId).emit("userList", room.users);
				io.to(room._id).emit("userCountUpdate", room.users.length);
			} catch (error) {
				console.error("Error al unirse a la sala:", error);
			}
		});

		socket.on("updatePosition", ({ x, y, prevDirection, direction }) => {
			const roomId = [...socket.rooms][1]; // Obtener la primera sala a la que se unió

			if (roomId) {
				io.to(roomId).emit("userMoved", {
					userId: user._id,
					x,
					y,
					prevDirection,
					direction,
				});
			}
		});

		socket.on("disconnect", async () => {
			console.log(`${user.username} se ha desconectado.`);

			try {
				await User.findByIdAndUpdate(user._id, {
					status: "offline",
					socketId: "",
				});

				const room = await Rooms.findOneAndUpdate(
					{ "users.socketId": socket.id },
					{ $pull: { users: { socketId: socket.id } } },
					{ new: true },
				);

				if (room) {
					io.to(room._id).emit("userList", room.users);
					io.to(room._id).emit("userCountUpdate", room.users.length);
				}
			} catch (error) {
				console.error("Error al manejar desconexión:", error);
			}
		});
	});
};

module.exports = { handleSocketEvents };
