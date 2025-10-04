const swaggerAutogen = require('swagger-autogen')();
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');


const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Movies API',
      description: 'API for managing movies',
    },
  },
  apis: ['./routes/*.js'], // caminhos para os arquivos de rotas com comentários Swagger
};

const specs = swaggerJsdoc(options); 
function setupSwagger(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
}

module.exports = setupSwagger;