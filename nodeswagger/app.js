// app.js (o tu archivo principal de la aplicación)
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();
const port = 3000;

// Definición de Swagger
const options = {
  definition: {
    openapi: '3.0.0', // Versión de OpenAPI
    info: {
      title: 'Mi API REST de Node.js', // Título de tu API
      version: '1.0.0', // Versión de tu API
      description: 'Una API de ejemplo para propósitos de demostración', // Descripción
    },
    servers: [
      {
        url: `http://localhost:${port}`, // URL base de tu API
        description: 'Servidor de desarrollo',
      },
    ],
  },
  // Rutas a los archivos que contienen los comentarios JSDoc
  // Estos comentarios se usarán para generar la especificación OpenAPI
  apis: ['./routes/*.js'], // Por ejemplo, si tus rutas están en la carpeta 'routes'
};


const usersRouter = require('./routes/users');
app.use('/', usersRouter); // O el prefijo que desees, por ejemplo, '/api'

const specs = swaggerJsdoc(options);
// Sirve la interfaz de Swagger UI en la ruta /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Ruta de API básica (ejemplo)
app.get('/', (req, res) => {
  res.send('¡Hola Mundo!');
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
  console.log(`Swagger UI disponible en http://localhost:${port}/api-docs`);
});
