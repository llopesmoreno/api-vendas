import BaseService from '@shared/BaseService';
import { User } from '../typeorm/entities/Users';
import UsersRepository from '../typeorm/repositories/UsersRepository';

export default class ListUsersService extends BaseService<UsersRepository> {
    constructor() {
        super(UsersRepository);
    }

    public async execute(): Promise<User[]> {
        const users = await this._repository.find();

        return users;
    }
}
