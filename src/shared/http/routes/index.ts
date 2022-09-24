import projectsRouter from '@modules/projects/routes/projects.routes';
import tasksRouter from '@modules/tasks/routes/tasks';
import { Router } from 'express';

const routes = Router();

routes.use('/projects', projectsRouter);
routes.use('/tasks', tasksRouter);

routes.get('/', (request, response) => {
  return response.json({ message: 'ok' });
});

export default routes;
