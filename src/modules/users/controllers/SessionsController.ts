import { Request, Response } from 'express';
import { CreateSessionService } from '@modules/users/services/UserServices';

export default class UsersSessionsController {
    // public async index(
    //     request: Request,
    //     response: Response,
    // ): Promise<Response> {
    //     const createUserService = new UserServices.ListUsersService();

    //     const users = await createUserService.execute();

    //     return response.json(users);
    // }

    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const createSessionService = new CreateSessionService();

        const { email, pass } = request.body;

        const session = await createSessionService.execute(email, pass);

        return response.json(session);
    }
}
