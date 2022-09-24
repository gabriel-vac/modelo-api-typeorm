import { EntityRepository, Repository } from 'typeorm';
import Project from '../entities/Project';

@EntityRepository(Project)
export class ProjectRepository extends Repository<Project> {
  public async findByName(name: string): Promise<Project | undefined> {
    const project = this.findOne({
      where: {
        name,
      },
    });

    return project;
  }
}
