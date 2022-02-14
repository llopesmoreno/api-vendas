import * as UserServices from '@modules/users/services/UserServices';
import { CreateUserRequest } from '@modules/users/services/models/CreateUserModel';
import { Request, Response } from 'express';

export default class UsersController {
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
