const entorno = require("../config/authConfig.js");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

exports.tokenMiddleware = (req, res, next) => {
	const authHeader = req.header("Authorization");

	// Verifica si el encabezado está presente
	if (!authHeader) {
		return res
			.status(401)
			.json({ message: "No se encontró token de autenticación" });
	}

	// Extrae el token del encabezado
	const token = authHeader.replace("Bearer ", "");

	try {
		const decoded = jwt.verify(token, JWT_SECRET);
		req.user = decoded;
		next();
	} catch (error) {
		return res.status(401).json({ message: "Token inválido o expirado" });
	}
};
