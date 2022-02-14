import { Request, Response } from 'express';
import * as UserServices from '@modules/users/services/UserServices';
import CreateUserRequest from '@modules/users/services/models/CreateUserModel';

export default class UsersController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const createUserService = new UserServices.ListUsersService();

        const users = await createUserService.execute();

        return response.json(users);
    }

    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const createUserService = new UserServices.CreateUserService();

        const { name, email, password } = request.body;

        const createUserRequest = new CreateUserRequest(name, email, password);

        const user = await createUserService.execute(createUserRequest);

        return response.json(user);
    }
}
