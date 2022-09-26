import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Task from '../typeorm/entities/Task';
import { TaskRepository } from '../typeorm/repositores/TaskRepository';

interface IRequest {
  name: string;
  responsible: string;
  deadline: Date;
  done: boolean;
  projectId: string;
}

class CreateTaskService {
  public async execute({
    name,
    responsible,
    deadline,
    done,
    projectId,
  }: IRequest): Promise<Task> {
    const taskRepository = getCustomRepository(TaskRepository);
    const taskExists = await taskRepository.findByName(name);

    if (taskExists) {
      throw new AppError('There is already one task with this name');
    }

    const task = taskRepository.create({
      name,
      responsible,
      deadline,
      done,
      projectId,
    });

    await taskRepository.save(task);

    return task;
  }
}

export default CreateTaskService;
