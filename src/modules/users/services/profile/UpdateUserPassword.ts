import { compare, hash } from 'bcryptjs';
import BaseService from '@shared/BaseService';
import { User } from '@modules/users/typeorm/entities/Users';
import UsersRepository from '@modules/users/typeorm/repositories/UsersRepository';

interface IRequest {
    user_id: string;
    password: string;
    password_confirmation: string;
    old_password: string;
}

export default class UpdateUserPasswordService extends BaseService<UsersRepository> {
    constructor() {
        super(UsersRepository);
    }

    public async execute({
        user_id,
        password,
        password_confirmation,
        old_password,
    }: IRequest): Promise<User> {
        const user = await this.getUser(user_id);

        await this.validatePass(
            user,
            old_password,
            password,
            password_confirmation,
        );

        return await this.updateUser(user, password);
    }

    private async getUser(user_id: string): Promise<User> {
        const user = await this._repository.findById(user_id);

        if (!user) throw this.getError('Usuário não encontrado', 404);

        return user;
    }

    private async updateUser(user: User, password: string): Promise<User> {
        const encriptedPassword = await hash(password, 8);

        user.password = encriptedPassword;

        await this._repository.save(user);

        return user;
    }

    private async validatePass(
        user: User,
        old_password: string,
        new_password: string,
        password_confirmation: string,
    ) {
        if (new_password !== password_confirmation)
            throw this.getError('Senha e confirmação devem ser iguais', 403);

        const passConfirmed = await compare(old_password, user.password);

        if (!passConfirmed)
            throw this.getError('A senha antiga está incorreta', 401);
    }
}
