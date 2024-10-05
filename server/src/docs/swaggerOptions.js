const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

const swaggerOptions = {
    definition: {
        openapi: '3.0.0', // Define que usas OpenAPI 3.0
        info: {
            title: 'Server', // Título del proyecto
            version: '1.0.0', // Versión de la API
            description: 'Documentacion de la API',
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
