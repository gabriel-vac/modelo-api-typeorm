import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Task from '../typeorm/entities/Task';
import { TaskRepository } from '../typeorm/repositores/TaskRepository';

interface IRequest {
  id: string;
  name: string;
  responsible: string;
  deadline: Date;
}

class UpdateTaskService {
  public async execute({
    id,
    name,
    responsible,
    deadline,
  }: IRequest): Promise<Task> {
    const taskRepository = getCustomRepository(TaskRepository);

    const task = await taskRepository.findOne(id);

    if (!task) {
      throw new AppError('Task not found');
    }

    const taskExist = await taskRepository.findByName(name);

    if (taskExist && name !== task.name) {
      throw new AppError('There is already one task with this name');
    }

    task.name = name;
    task.responsible = responsible;
    task.deadline = deadline;

    await taskRepository.save(task);

    return task;
  }
}

export default UpdateTaskService;
