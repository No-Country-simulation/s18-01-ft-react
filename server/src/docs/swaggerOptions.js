const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

const swaggerOptions = {
    definition: {
        openapi: '3.0.0', // Define que usas OpenAPI 3.0
        info: {
            title: 'Server', // Título del proyecto
            version: '0.0.0', // Versión de la API
            description: 'API para manejar todas las rutas de mi proyecto',
        },
        servers: [
            {
                url: `http://${process.env.HOST}:${process.env.PORT}`, // URL del servidor
            },
        ],
    },
    apis: ['./src/router/*.js'], // Aquí defines donde están tus rutas documentadas
};

module.exports = swaggerOptions;
