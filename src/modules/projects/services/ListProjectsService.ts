import { getCustomRepository } from 'typeorm';
import Project from '../typeorm/entities/Project';
import { ProjectRepository } from '../typeorm/repositores/ProjectRepository';

class ListProjectsService {
  public async execute(): Promise<Project[]> {
    const projectRepository = getCustomRepository(ProjectRepository);

    const projects = await projectRepository.find();

    return projects;
  }
}

export default ListProjectsService;
