import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import TasksController from '../controllers/TasksController';

const tasksRouter = Router();
const tasksController = new TasksController();

tasksRouter.get('/', tasksController.index);

tasksRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  tasksController.create,
);

tasksRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  tasksController.update,
);

tasksRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  tasksController.delete,
);

export default tasksRouter;
