import { Request, Response } from 'express';
import CreateTaskService from '../services/CreateTaskService';
import DeleteTaskService from '../services/DeleteTaskService';
import ListTasksService from '../services/ListTasksService';
import UpdateTaskService from '../services/UpdateTaskService';

export default class TasksController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listTasks = new ListTasksService();
    const { id } = request.params;

    const tasks = await listTasks.execute({ projectId: id });

    return response.json(tasks);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, responsible, deadline, projectId } = request.body;

    const createTask = new CreateTaskService();

    const task = await createTask.execute({
      name,
      responsible,
      deadline,
      projectId,
    });

    return response.json(task);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, responsible, deadline } = request.body;

    const updateTask = new UpdateTaskService();

    const task = await updateTask.execute({ id, name, responsible, deadline });

    return response.json(task);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteTask = new DeleteTaskService();

    await deleteTask.execute({ id });

    return response.json([]);
  }
}
