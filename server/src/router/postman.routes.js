const express = require("express");
const router = express.Router();
const path = require('path');

/**
 * @opemapi
 * tags:
 *   - name: DocPostman
 *     description: Posibilidad de Descargar la Coleccion de Postman
 */

/**
 * @openapi
 * /docs/postman-collection:
 *   get:
 *     summary: Descarga la colección de Postman
 *     description: Permite descargar la colección de Postman para realizar pruebas con la API.
 *     tags:
 *       - DocPostman
 *     responses:
 *       200:
 *         description: Colección descargada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Archivo descargado correctamente."
 *       500:
 *         description: Error al descargar la colección.
 */
router.get('/docs/postman-collection', (req, res) => {
    // Ruta relativa al archivo JSON desde la carpeta del proyecto
    const filePath = path.join(__dirname, '../docs/postman-collection.json');

    res.download(filePath, 'postman-collection.json', (err) => {
        if (err) {
            console.error('Error al descargar la colección:', err);
            return res.status(500).json({ message: 'Error al descargar la colección' });
        }
    });
});

module.exports = router;
