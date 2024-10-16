const express = require("express");
const router = express.Router();
const { register, login, forgotPassword, updateProfile, resetPassword } =
	require("../controller/userController.js");
const { tokenMiddleware } = require("../middlewares/middleware.js");

//rutas de autenticacion y perfil

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.put("/profile", tokenMiddleware, updateProfile);

module.exports = router;
