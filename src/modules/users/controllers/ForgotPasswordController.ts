import { NextFunction, Request, Response } from 'express';
import * as UserServices from '@modules/users/services/UserServices';

export default class ForgotPasswordController {
    public async create(
        request: Request,
        response: Response,
        next: NextFunction,
    ): Promise<Response> {
        const service = new UserServices.SendForgotPasswordEmailService();

        const { email } = request.body;

        await service.execute({ email });

        return response.status(204).json();
    }
}
