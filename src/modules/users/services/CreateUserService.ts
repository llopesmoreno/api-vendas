import BaseService from '@shared/BaseService';
import { User } from '../typeorm/entities/Users';
import CreateUserRequest from './models/CreateUserModel';
import UsersRepository from '../typeorm/repositories/UsersRepository';

export default class CreateProductService extends BaseService<UsersRepository> {
    constructor() {
        super(UsersRepository);
    }

    public async execute(request: CreateUserRequest): Promise<User> {
        this.checkRequest(request);

        await this.checkEmail(request.email);

        const user = await this.createUser(
            request.name,
            request.email,
            request.password,
        );

        return user;
    }

    private checkRequest(request: CreateUserRequest) {
        if (request.invalidRequest()) {
            const errors = request.getRequestErrors();

            throw this.getError(
                'Os dados da requisição são inválidos',
                400,
                errors,
            );
        }
    }

    private async checkEmail(email: string) {
        const product = await this._repository.findByEmail(email);
        if (product !== undefined)
            throw this.getError('Já existe um usuário com o e-mail:' + email);
    }

    private async createUser(
        name: string,
        email: string,
        password: string,
    ): Promise<User> {
        const user = this._repository.create({
            name,
            email,
            password,
        });

        await this._repository.save(user);

        return user;
    }
}
