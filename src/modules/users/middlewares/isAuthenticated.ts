import auth from '@config/auth';
import AppError from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';
import { sign, verify } from 'jsonwebtoken';

export default function isAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction,
): void {
    const authHeader = request.headers.authorization;

    if (!authHeader) throw new AppError('Token é obrigatório', 401);

    const [, token] = authHeader.split(' ');

    try {
        verify(token, auth.jwt.secret);
        return next();
    } catch (error) {
        throw new AppError('Token inválido', 401);
    }
}