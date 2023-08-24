import swaggerJsdoc from 'swagger-jsdoc';
import path from 'path'; // Import the path module

console.log(path.join(__dirname, '../schema/user_schema.json'));
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API',
      version: '1.0.0',
    },
    servers:[
        {
            url:"http://localhost:8000"
        }
    ]
  },
  apis: [path.join(__dirname, '../schemas/user_schema.json')], // Use the correct path to your Swagger annotations
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
