const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../persistencia/models/user.models.js");
const nodemailer = require("nodemailer");
const entorno = require("../config/authConfig.js");
const {createAccess} = require('../utils/createAcesstoken.js')

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRATION = "1h"; // Expiración del token

// Registro de usuario
exports.register = async (req, res) => {
	const { email, password } = req.body;

	try {
		// Verifica si el usuario ya está registrado
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res
				.status(400)
				.json({ message: "El usuario ya está registrado." });
		}

		// Encripta la contraseña
		const hashedPassword = await bcrypt.hash(password, 10);

		// Crea un nuevo usuario
		const newUser = new User({
			email,
			password: hashedPassword,
			authId: null,
		});

		await newUser.save();

		// Genera el token JWT
		const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, {
			expiresIn: JWT_EXPIRATION,
		});
		return res.status(201).json({ token });
	} catch (error) {
		return res.status(500).json({ message: "Error en el servidor", error });
	}
};

// Inicio de sesión (Login)
exports.login = async (req, res) => {
	const { email, password } = req.body;

	try {
		// Verifica si el usuario existe
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ message: "Usuario no encontrado." });
		}

		// Verifica la contraseña
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({ message: "Contraseña incorrecta." });
		}

		// Genera el token JWT
		const token = createAccess({ userId: user._id });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000, // 1 día
            path: '/'
        });

		return res.status(200).json({ token });
	} catch (error) {
		return res.status(500).json({ message: "Error en el servidor", error });
	}
};

// Configuración de Nodemailer
const transport = nodemailer.createTransport({
	service: "gmail",
	host: "smtp.gmail.com",
	secure: false,
	port: 587,
	auth: {
		user: process.env.MAIL_USER,
		pass: process.env.MAIL_PASS,
	},
	tls: {
		rejectUnauthorized: false,
	},
});

// Olvidé mi contraseña
exports.forgotPassword = async (req, res) => {
	const { email } = req.body;

	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ message: "Usuario no encontrado." });
		}

		// Genera un token de restablecimiento de contraseña
		const resetToken = jwt.sign({ userId: user._id }, JWT_SECRET, {
			expiresIn: JWT_EXPIRATION,
		});

		// Enlace para restablecer la contraseña
		const resetLink = `http://localhost:8080/reset-password/${resetToken}`; // Cambia la URL al front-end de tu aplicación

		// Configuración del correo
		const mailOptions = {
			from: process.env.MAIL_USER,
			to: email,
			subject: "Restablecer contraseña",
			html: `
                <h3>Has solicitado restablecer tu contraseña</h3>
                <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
                <a href="${resetLink}">Restablecer Contraseña</a>
                <p>Si no solicitaste esto, ignora este correo.</p>
            `,
		};

		// Envía el correo
		transport.sendMail(mailOptions, (error, info) => {
			if (error) {
				return res
					.status(500)
					.json({ message: "Error enviando el correo", error });
			}
			return res
				.status(200)
				.json({ message: "Correo de restablecimiento enviado" });
		});
	} catch (error) {
		console.error("Error en el servidor", error);
		return res.status(500).json({ message: "Error en el servidor", error });
	}
};

// Restablecer contraseña
exports.resetPassword = async (req, res) => {
	const { token, newPassword } = req.body;

	try {
		// Verifica el token
		const decoded = jwt.verify(token, JWT_SECRET);

		// Encuentra al usuario por su ID
		const user = await User.findById(decoded.userId);
		if (!user) {
			return res
				.status(400)
				.json({ message: "Token inválido o usuario no encontrado" });
		}

		// Encripta la nueva contraseña
		const hashedPassword = await bcrypt.hash(newPassword, 10);

		// Actualiza la contraseña del usuario
		user.password = hashedPassword;
		await user.save();

		return res
			.status(200)
			.json({ message: "Contraseña restablecida exitosamente" });
	} catch (error) {
		return res
			.status(400)
			.json({ message: "Token inválido o expirado", error });
	}
};

// Actualización del perfil
exports.updateProfile = async (req, res) => {
	const userId = req.user.userId;
	const { firstName, lastName, username, rol, profilePicture } = req.body;

	try {
		const updatedUser = await User.findByIdAndUpdate(
			userId,
			{
				firstName,
				lastName,
				username,
				rol,
				profilePicture,
			},
			{ new: true },
		);

		return res.status(200).json(updatedUser);
	} catch (error) {
		return res
			.status(500)
			.json({ message: "Error actualizando el perfil", error });
	}
};


exports.getProfile = async(req, res)=> {
	try{
		const user = await User.findById(req.user.id).select(
			"-password -__v"
		);
		//
		if(!user){
			return res.status(404).json({message:"Usuario no encontrado"})
		}
		res.status(200).json(user)
	} catch(error){
		return res.status(500).json({message:" Error en el servidor", error});
	}
}