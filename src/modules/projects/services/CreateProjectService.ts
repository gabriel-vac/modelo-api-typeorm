import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Project from '../typeorm/entities/Project';
import { ProjectRepository } from '../typeorm/repositores/ProjectRepository';

interface IRequest {
  name: string;
}

class CreateProjectService {
  public async execute({ name }: IRequest): Promise<Project> {
    const projectRepository = getCustomRepository(ProjectRepository);
    const projectExists = await projectRepository.findByName(name);

    if (projectExists) {
      throw new AppError('There is already one project with this name');
    }

    const project = projectRepository.create({
      name,
    });

    await projectRepository.save(project);

    return project;
  }
}

export default CreateProjectService;
