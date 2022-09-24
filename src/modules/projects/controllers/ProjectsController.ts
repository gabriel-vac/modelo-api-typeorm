import { Request, Response } from 'express';
import CreateProjectService from '../services/CreateProjectService';
import DeleteProjectService from '../services/DeleteProjectService';
import ListProjectService from '../services/ListProjectsService';
import UpdateProjectService from '../services/UpdateProjectService';

export default class ProjectsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listProjects = new ListProjectService();

    const projects = await listProjects.execute();

    return response.json(projects);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createProject = new CreateProjectService();

    const project = await createProject.execute({ name });

    return response.json(project);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name } = request.body;

    const updateProject = new UpdateProjectService();

    const project = await updateProject.execute({ id, name });

    return response.json(project);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteProject = new DeleteProjectService();

    await deleteProject.execute({ id });

    return response.json([]);
  }
}
