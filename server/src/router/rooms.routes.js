const express = require('express');
const router = express.Router();
const { createRoom, getRooms } = require('../controller/rooms.controller.js');

/**
 * @swagger
 * /rooms/create:
 *   post:
 *     summary: Crear una nueva sala
 *     description: Crea una nueva sala con el nombre especificado y la información del creador. 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre de la sala que se va a crear.
 *                 example: "Sala de Chat"
 *               creator:
 *                 type: string
 *                 description: Nombre del creador de la sala.
 *                 example: "Usuario123"
 *     responses:
 *       201:
 *         description: Sala creada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Sala creada con éxito"
 *                 roomId:
 *                   type: string
 *                   description: ID de la sala recién creada.
 *                   example: "60c72b2f9b1d5f1a4c0f8e2e"
 *       400:
 *         description: Error en la solicitud, nombre de la sala no proporcionado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "El nombre de la sala es requerido."
 */
router.post('/create', createRoom);

/**
 * @swagger
 * /rooms/allrooms:
 *   get:
 *     summary: Obtener todas las salas
 *     description: Devuelve una lista de todas las salas disponibles.
 *     responses:
 *       200:
 *         description: Lista de salas devuelta exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID de la sala.
 *                     example: "60c72b2f9b1d5f1a4c0f8e2e"
 *                   name:
 *                     type: string
 *                     description: Nombre de la sala.
 *                     example: "Sala de Chat"
 *                   creator:
 *                     type: string
 *                     description: Nombre del creador de la sala.
 *                     example: "Usuario123"
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error al obtener las salas."
 */
router.get('/allrooms', getRooms);

module.exports = router;