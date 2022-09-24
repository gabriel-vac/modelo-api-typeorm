import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import ProjectsController from '../controllers/ProjectsController';

const projectsRouter = Router();
const projectsController = new ProjectsController();

projectsRouter.get('/', projectsController.index);

projectsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  projectsController.create,
);

projectsRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  projectsController.update,
);

projectsRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  projectsController.delete,
);

export default projectsRouter;
