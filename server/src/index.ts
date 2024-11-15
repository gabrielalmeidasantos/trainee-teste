import express from 'express';
import taskRoutes from './routes/taskRoutes';
import swaggerUi from 'swagger-ui-express';
const swaggerJsdoc = require('swagger-jsdoc');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

(async () => {
  const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'API de Gerenciamento de Tarefas',
        version: '1.0.0',
        description: 'Documentação da API para gerenciamento de tarefas',
      },
    },
    apis: ['./src/routes/*.ts'],
  };
  const swaggerDocs = swaggerJsdoc(swaggerOptions);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

  app.use('/tasks', taskRoutes);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
})();
