const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Portfolio',
      version: '1.0.0',
      description: 'Documentation de l’API Portfolio',
    },
    servers: [
      {
        url: 'http://localhost:3001',
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      { BearerAuth: [] }
    ],
  },
  apis: [__dirname + '/routes/*.js', __dirname + '/routes/**/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerUi, swaggerSpec };
