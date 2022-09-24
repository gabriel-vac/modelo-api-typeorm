import projectsRouter from '@modules/projects/routes/projects.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/projects', projectsRouter);

routes.get('/', (request, response) => {
  return response.json({ message: 'ok' });
});

export default routes;
