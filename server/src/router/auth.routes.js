const express = require('express');
const { auth, requiresAuth } = require('express-openid-connect');
const router = express.Router();
const authConfig = require('../config/authConfig');
const { login, logout, profile, status } = require('../controller/auth.controller');

/**
 * @swagger
 * /login:
 *   get:
 *     summary: Iniciar sesión con Google o GitHub
 *     description: Redirige a Google o GitHub para que el usuario inicie sesión usando OAuth. Este proceso utiliza Auth0 como intermediario para la autenticación.
 *     security:
 *       - oauth2:
 *           - openid  # Esto depende de tu configuración específica de OAuth
 *     responses:
 *       302:
 *         description: Redirección a la página de inicio de sesión de Auth0, Google o GitHub.
 *       401:
 *         description: Si no se puede redirigir correctamente o no hay un proveedor configurado.
 */
router.get('/login', requiresAuth(),login);

/**
 * @swagger
 * /logout:
 *   get:
 *     summary: Cerrar sesión
 *     description: Cierra la sesión del usuario y redirige a la página de inicio.
 *     responses:
 *       302:
 *         description: Redirige a la página de inicio después de cerrar sesión.
 */
router.get('/logout', logout);

/**
 * @swagger
 * /auth:
 *   get:
 *     summary: Verifica el estado de autenticación
 *     description: Devuelve el estado de autenticación del usuario. Indica si el usuario está autenticado o no.
 *     responses:
 *       200:
 *         description: Estado de autenticación del usuario
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Logged in
 *       401:
 *         description: Usuario no autenticado
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Logged out
 */
router.get('/', status);

/**
 * @swagger
 * /auth/profile:
 *   get:
 *     summary: Obtiene el perfil del usuario
 *     description: Devuelve la información del usuario autenticado. Este endpoint requiere que el usuario esté autenticado para acceder a su perfil.
 *     security:
 *       - bearerAuth: []  # Si usas autenticación con token (Bearer Token)
 *     responses:
 *       200:
 *         description: Perfil del usuario autenticado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sid:
 *                   type: string
 *                   description: ID de la sesión
 *                   example: "123456789"
 *                 given_name:
 *                   type: string
 *                   description: Nombre de pila
 *                   example: "Nombre"
 *                 family_name:
 *                   type: string
 *                   description: Apellido(s)
 *                   example: "Apellidos"
 *                 nickname:
 *                   type: string
 *                   description: Apodo del usuario
 *                   example: "Apodo"
 *                 name:
 *                   type: string
 *                   description: Nombre completo del usuario
 *                   example: "Nombre Completo"
 *                 picture:
 *                   type: string
 *                   description: URL de la imagen de perfil del usuario
 *                   example: "https://lh3.googleusercontent.com/a/11111"
 *                 updated_at:
 *                   type: string
 *                   description: Fecha y hora de la última actualización del perfil
 *                   example: "2024-10-05T03:23:04.979Z"
 *                 email:
 *                   type: string
 *                   description: Correo electrónico del usuario
 *                   example: "example@gmail.com"
 *                 email_verified:
 *                   type: boolean
 *                   description: Indica si el correo electrónico ha sido verificado
 *                   example: true
 *                 sub:
 *                   type: string
 *                   description: Identificador único del usuario en el sistema de autenticación
 *                   example: "google-oauth2|11111111111111"
 *       401:
 *         description: No autenticado - El usuario no está autenticado o el token es inválido
 */
router.get('/profile', profile);



module.exports = router;
