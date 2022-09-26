import { getCustomRepository } from 'typeorm';
import Task from '../typeorm/entities/Task';
import { TaskRepository } from '../typeorm/repositores/TaskRepository';

interface IRequest {
  projectId: string;
}

class ListTasksService {
  public async execute({ projectId }: IRequest): Promise<Task[]> {
    const taskRepository = getCustomRepository(TaskRepository);

    const tasks = await taskRepository.find({
      where: {
        projectId,
      },
    });

    return tasks;
  }
}

export default ListTasksService;
