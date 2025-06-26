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
      schemas: {
        Commande: {
          type: 'object',
          properties: {
            _id: { type: 'string', description: 'ID de la commande' },
            user: { type: 'string', description: 'ID de l’utilisateur' },
            items: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  plat: { type: 'string', description: 'ID du plat' },
                  type: { type: 'string', enum: ['plat', 'twister', 'boisson'] },
                  name: { type: 'string' },
                  price: { type: 'number' }
                }
              }
            },
            isMenu: { type: 'boolean', description: 'Commande menu ou non' },
            total: { type: 'number', description: 'Prix total' },
            createdAt: { type: 'string', format: 'date-time' }
          }
        }
      }
    },
    security: [
      { BearerAuth: [] }
    ],
  },
  apis: [
    __dirname + '/routes/*.js',
    __dirname + '/routes/**/*.js'
  ]
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerUi, swaggerSpec };
