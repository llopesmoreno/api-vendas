import UserModel from './UserModel';

export default class CreateUserRequest extends UserModel {
    constructor(name: string, email: string, password: string) {
        super(name, email, password);
    }
}
