import { NextFunction, Request, Response } from 'express';
import * as UserServices from '@modules/users/services/UserServices';

export default class ResetPasswordController {
    public async create(
        request: Request,
        response: Response,
        next: NextFunction,
    ): Promise<Response> {
        const service = new UserServices.ResetUserPassword();

        const { token, password } = request.body;

        await service.execute({ token, password });

        return response.status(204).json();
    }
}
