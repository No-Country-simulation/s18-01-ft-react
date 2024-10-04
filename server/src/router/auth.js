const express = require('express');
const { auth, requiresAuth } = require('express-openid-connect');
const router = express.Router();
const authConfig = require('../config/authConfig');

/**
 * @swagger
 * /login:
 *   get:
 *     summary: Iniciar sesión
 *     description: Redirige al usuario a Auth0 para iniciar sesión. El usuario será redirigido a la página de inicio después de iniciar sesión.
 *     responses:
 *       302:
 *         description: Redirige a Auth0 para login.
 */
router.get('/login', (req, res) => {
    res.oidc.login(); // Redirige a Auth0 para iniciar sesión
});

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
router.get('/logout', (req, res) => {
    res.oidc.logout(); // Cierra la sesión y redirige al usuario
});

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
router.get('/', (req, res) => {
    console.log('Usuario detectado, ¿está autenticado?', req.oidc.isAuthenticated());
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Obtiene el perfil del usuario
 *     description: Devuelve la información del usuario autenticado. Este endpoint requiere que el usuario esté autenticado para acceder a su perfil.
 *     security:
 *       - bearerAuth: [] // Asegúrate de que este esquema de autenticación esté definido
 *     responses:
 *       200:
 *         description: Información del perfil del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: John Doe
 *                 email:
 *                   type: string
 *                   example: john.doe@example.com
 *                 picture:
 *                   type: string
 *                   example: "https://example.com/johndoe.jpg"
 *                 sub:
 *                   type: string
 *                   example: "auth0|605c72f841e5e9001f6a7bb8"
 *       401:
 *         description: Usuario no autenticado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Unauthorized
 */
router.get('/profile', requiresAuth(), (req, res) => {
    res.json(req.oidc.user); // Enviar información del usuario como respuesta
});

/**
 * @swagger
 * /auth/callback:
 *   get:
 *     summary: Callback de Auth0
 *     description: Redirige al usuario a la página de perfil o al inicio después de la autenticación. Este endpoint es el destino del redireccionamiento después de que el usuario inicia sesión.
 *     responses:
 *       200:
 *         description: Muestra el perfil del usuario.
 *       302:
 *         description: Redirige al usuario a la página de perfil o a la página de inicio.
 */
router.get('/callback', (req, res) => {
    console.log('Callback hit, checking authentication...');
    console.log('Estado de autenticación:', req.oidc.isAuthenticated());
    if (req.oidc.isAuthenticated()) {
        console.log('Usuario autenticado, renderizando auth0.ejs');
        res.render('auth0');
    } else {
        console.log('Usuario no autenticado, redirigiendo a login');
        res.redirect('/auth/login');
    }
});

module.exports = router;
