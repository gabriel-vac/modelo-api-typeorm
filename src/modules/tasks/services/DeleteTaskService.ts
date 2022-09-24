import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { TaskRepository } from '../typeorm/repositores/TaskRepository';

interface IRequest {
  id: string;
}

class DeleteTaskService {
  public async execute({ id }: IRequest): Promise<void> {
    const taskRepository = getCustomRepository(TaskRepository);

    const task = await taskRepository.findOne(id);

    if (!task) {
      throw new AppError('Task not found');
    }

    await taskRepository.remove(task);
  }
}

export default DeleteTaskService;
