import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Project from '../typeorm/entities/Project';
import { ProjectRepository } from '../typeorm/repositores/ProjectRepository';

interface IRequest {
  id: string;
  name: string;
}

class UpdateProjectService {
  public async execute({ id, name }: IRequest): Promise<Project> {
    const projectRepository = getCustomRepository(ProjectRepository);

    const project = await projectRepository.findOne(id);

    if (!project) {
      throw new AppError('Project not found');
    }

    const projectExists = await projectRepository.findByName(name);

    if (projectExists && name !== project.name) {
      throw new AppError('There is already one project with this name');
    }

    project.name = name;

    await projectRepository.save(project);

    return project;
  }
}

export default UpdateProjectService;
