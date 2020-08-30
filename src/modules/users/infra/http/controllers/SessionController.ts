import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import AuthenticateUsersService from '../../../services/AuthenticateUsersService';

export default class UserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUsers = container.resolve(AuthenticateUsersService);

    const { user, token } = await authenticateUsers.execute({
      email,
      password,
    });
    return response.json({ user: classToClass(user), token });
  }
}
