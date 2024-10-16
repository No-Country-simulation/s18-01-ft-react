const { registerEmp, loginEmp, confirmEmail, sendResetPasswordEmail, resetPassword } = require('../controller/emp.controller.js');
const express = require('express');
const router = express.Router();


/**
 * @swagger
 * tags:
 *   - name: Empresa
 *     description: Operaciones relacionadas con los empresas, incluyendo registro, inicio de sesión, y restablecimiento de contraseña.
 */

/**
 * @swagger
 * /emp/register:
 *   post:
 *     tags: [Empresa]
 *     summary: Registra un nuevo empresa
 *     description: Registra un nuevo empresa, enviando un correo de confirmación de cuenta.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               domain:
 *                 type: string
 *                 description: Dominio de la empresa del empresa.
 *               name:
 *                 type: string
 *                 description: Nombre del empresa.
 *               email:
 *                 type: string
 *                 description: Correo electrónico del empresa.
 *               password:
 *                 type: string
 *                 description: Contraseña para la cuenta.
 *     responses:
 *       201:
 *         description: Registro exitoso, se envía un correo de confirmación.
 *       409:
 *         description: El nombre o el correo ya están en uso.
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/register', registerEmp);

/**
 * @swagger
 * /emp/login:
 *   post:
 *     tags: [Empresa]
 *     summary: Inicia sesión como empresa
 *     description: Esta ruta permite que un empresa inicie sesión con su email y contraseña.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso.
 *       401:
 *         description: Credenciales inválidas.
 *       409:
 *         description: Email no registrado.
 *       500:
 *         description: Error en el servidor.
 */
router.post('/login', loginEmp);

/**
 * @swagger
 * /emp/confirmemail:
 *   post:
 *     tags: [Empresa]
 *     summary: Confirma el correo electrónico
 *     description: Verifica el token de confirmación de correo y activa la cuenta.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *     responses:
 *       200:
 *         description: Correo verificado con éxito.
 *       400:
 *         description: Token inválido o expirado.
 *       500:
 *         description: Error en el servidor.
 */
router.post('/confirmemail', confirmEmail);

/**
 * @swagger
 * /emp/sendresetpasswordemail:
 *   post:
 *     tags: [Empresa]
 *     summary: Envía un enlace para restablecer la contraseña
 *     description: Envía un correo electrónico con un enlace para que el usuario restablezca su contraseña.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Enlace de restablecimiento enviado al correo electrónico.
 *       404:
 *         description: Email no registrado.
 *       500:
 *         description: Error en el servidor.
 */
router.post('/sendresetpasswordemail', sendResetPasswordEmail);

/**
 * @swagger
 * /emp/resetpassword:
 *   post:
 *     tags: [Empresa]
 *     summary: Restablece la contraseña
 *     description: Permite al usuario restablecer su contraseña usando el token proporcionado.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contraseña restablecida con éxito.
 *       400:
 *         description: Token inválido o expirado.
 *       500:
 *         description: Error en el servidor.
 */
router.post('/resetpassword', resetPassword);

module.exports = router;