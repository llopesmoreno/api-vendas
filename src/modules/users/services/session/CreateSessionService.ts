import { compare } from 'bcryptjs';
import BaseService from '@shared/BaseService';
import { User } from '../../typeorm/entities/Users';
import UsersRepository from '../../typeorm/repositories/UsersRepository';

export default class CreateSessionService extends BaseService<UsersRepository> {
    constructor() {
        super(UsersRepository);
    }

    public async execute(
        email: string,
        pass: string,
    ): Promise<User | undefined> {
        const user = await this.getUserByEmail(email);

        await this.validatePass(user, pass);

        return user;
    }

    private async getUserByEmail(email: string): Promise<User> {
        const user = await this._repository.findByEmail(email);

        if (!user) throw this.getError('E-mail ou senha inválidos', 401);

        return user;
    }

    private async validatePass(user: User, pass: string) {
        const passConfirmed = await compare(pass, user.password);

        if (!passConfirmed)
            throw this.getError('E-mail ou senha inválidos', 401);
    }
}
