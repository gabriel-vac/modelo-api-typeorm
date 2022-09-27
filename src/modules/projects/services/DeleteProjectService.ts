import { TaskRepository } from '@modules/tasks/typeorm/repositores/TaskRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { ProjectRepository } from '../typeorm/repositores/ProjectRepository';

interface IRequest {
  id: string;
}

class DeleteProjectService {
  public async execute({ id }: IRequest): Promise<void> {
    const projectRepository = getCustomRepository(ProjectRepository);
    const taskRepository = getCustomRepository(TaskRepository);

    const project = await projectRepository.findOne(id);

    if (!project) {
      throw new AppError('Project not found');
    }

    const projectTasks = await taskRepository.find({
      where: {
        projectId: id,
      },
    });

    await taskRepository.remove(projectTasks);

    await projectRepository.remove(project);
  }
}

export default DeleteProjectService;
