const express = require('express')
const router = express.Router()
const { register, login, forgotPassword, updateProfile } =
	require('../controller/userController.js')
const { authMiddleware } = require('../middlewares/middleware.js')

//rutas de autenticacion y perfil

router.post('/register', register)
router.post('/login', login)
router.post('/forgot-password', forgotPassword)
router.put('/profile', authMiddleware, updateProfile)

module.exports = router
