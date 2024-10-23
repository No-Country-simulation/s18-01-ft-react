const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "uploads/"); // El directorio donde se guardarán los archivos
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + path.extname(file.originalname)); // Nombra el archivo con la fecha actual para evitar conflictos
	},
});

const upload = multer({ storage: storage });

module.exports = upload;
