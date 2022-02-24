import cors from 'cors';
import '@shared/typeorm';
import 'reflect-metadata';
import 'express-async-errors';
import routes from './routes';
import { errors } from 'celebrate';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import express, { NextFunction, Request, Response } from 'express';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);
app.use(errors());

app.use(
    (
        error: Error,
        request: Request,
        response: Response,
        next: NextFunction,
    ) => {
        if (error instanceof AppError) {
            return response.status(error.statusCode).json({
                status: 'error',
                message: error.message,
                errors: error.errors,
            });
        }

        return response.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
        });
    },
);

app.listen(3333, () => {
    console.log('Server started on port 3333!');
});
