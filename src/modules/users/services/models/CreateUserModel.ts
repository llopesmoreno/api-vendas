import { isEmptyOrWhiteSpace } from '@shared/Validations';

class UserModel {
    readonly name: string;
    readonly email: string;
    readonly password: string;

    constructor(name: string, email: string, password: string) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    public invalidName(): boolean {
        return isEmptyOrWhiteSpace(this.name);
    }

    public invalidEmail(): boolean {
        return isEmptyOrWhiteSpace(this.email);
    }

    public invalidPassword(): boolean {
        //todo validate required characters
        return isEmptyOrWhiteSpace(this.password);
    }

    public invalidRequest(): boolean {
        return (
            this.invalidName() || this.invalidEmail() || this.invalidPassword()
        );
    }

    public getRequestErrors(): string[] {
        const errors = [];

        if (this.invalidName()) {
            errors.push('O nome é inválido');
        }
        if (this.invalidEmail()) {
            errors.push('O e-mail é inválido.');
        }
        if (this.invalidPassword()) {
            errors.push('A senha é inválida.');
        }

        return errors;
    }
}

class CreateUserRequest extends UserModel {
    constructor(name: string, email: string, password: string) {
        super(name, email, password);
    }
}

export { CreateUserRequest, UserModel };
