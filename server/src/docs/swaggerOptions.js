const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

const swaggerOptions = {
    definition: {
        openapi: '3.0.0', // Define que usas OpenAPI 3.0
        info: {
            title: 'Escape Co', // Título del proyecto
            version: '1.0.0', // Versión de la API
            description: 'Documentacion de Escape Co : https://github.com/No-Country-simulation/s18-01-ft-react'
        },
        servers: [
            {
                url: `${process.env.AUTH0_BASE_URL}`, // URL del servidor
            },
        ],
    },
    apis: ['./src/router/*.js'], // Aquí defines donde están tus rutas documentadas
};

module.exports = swaggerOptions;
