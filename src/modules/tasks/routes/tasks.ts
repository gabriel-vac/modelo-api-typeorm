import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import TasksController from '../controllers/TasksController';

const tasksRouter = Router();
const tasksController = new TasksController();

tasksRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  tasksController.index,
);

tasksRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      responsible: Joi.string().allow(''),
      deadline: Joi.date().optional(),
      projectId: Joi.string().uuid().required(),
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
      responsible: Joi.string().allow(''),
      deadline: Joi.date(),
      projectId: Joi.string().uuid().required(),
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
