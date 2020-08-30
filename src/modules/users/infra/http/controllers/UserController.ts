import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import CreateUsersService from '../../../services/CreateUserService';

export default class UserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUsers = container.resolve(CreateUsersService);

    const user = await createUsers.execute({ name, email, password });
    return response.json(classToClass(user));
  }
}
