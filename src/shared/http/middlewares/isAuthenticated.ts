import auth from '@config/auth';
import AppError from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';
import { sign, verify } from 'jsonwebtoken';

interface ITokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

export default function isAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction,
): void {
    const authHeader = request.headers.authorization;

    if (!authHeader) throw new AppError('Token é obrigatório', 401);

    const [, token] = authHeader.split(' ');

    try {
        const decoderedToken = verify(token, auth.jwt.secret);

        const { sub } = decoderedToken as ITokenPayload;

        request.user = {
            id: sub,
        };

        return next();
    } catch (error) {
        throw new AppError('Token inválido', 401);
    }
}
