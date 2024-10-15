// Definir el middleware
// function myMiddleware(req, res, next) {
//     console.log('Middleware ejecutado'); // Por ejemplo, registrar la petición
//     next(); // Llama a la siguiente función middleware
// }

// module.exports = myMiddleware;
const auth = require("../config/authConfig.js");
const jwt = require("jsonwebtoken");
const JWT_SECRET = auth.JWT_SECRET;

exports.authMiddleware = (req, res, next) => {
	const token = req.header("Authorization").replace("Bearer ", "");

	if (!token) {
		return res
			.status(401)
			.json({ message: "No se encontró token de autenticación" });
	}

	try {
		const decoded = jwt.verify(token, JWT_SECRET);
		req.user = decoded;
		next();
	} catch (error) {
		return res.status(401).json({ message: "Token inválido o expirado" });
	}
};
