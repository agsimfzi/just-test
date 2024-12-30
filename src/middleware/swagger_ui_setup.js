const swaggerUi = require('swagger-ui-express')
const swaggerJsdoc = require('swagger-jsdoc')

const options = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'Just Test',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      }
    },
    security: [{
      bearerAuth: []
    }]
  },
  apis: ['src/routes/*.js'],
}

const specs = swaggerJsdoc(options)

module.exports = { swaggerUiServe: swaggerUi.serve, swaggerUiSetup: swaggerUi.setup(specs, { explorer: true }) }