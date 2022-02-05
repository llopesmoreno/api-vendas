import AppError from '@shared/errors/AppError';
import { getCustomRepository, ObjectType } from 'typeorm';

abstract class BaseService<T> {
    protected readonly _repository: T;

    constructor(repository: ObjectType<T>) {
        this._repository = getCustomRepository(repository);
    }

    protected getError(
        message: string,
        statusCode = 400,
        errors: string[] = [],
    ): AppError {
        const appError = new AppError(message, statusCode, errors);
        return appError;
    }
}

export default BaseService;
