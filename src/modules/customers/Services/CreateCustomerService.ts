import BaseService from '@shared/BaseService';
import { Customer } from '../typeorm/entities/Customer';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

interface IRequest {
    name: string;
    email: string;
}

export default class CreateCustomerService extends BaseService<CustomersRepository> {
    constructor() {
        super(CustomersRepository);
    }

    public async execute({ name, email }: IRequest): Promise<Customer> {
        await this.verifyEmailExists(email);

        const customer = this._repository.create({ name, email });

        await this._repository.save(customer);

        return customer;
    }

    private async verifyEmailExists(email: string) {
        const customerExists = await this._repository.findByEmail(email);
        if (customerExists)
            throw this.getError(
                'Já existe um cliente cadastrado com este e-mail',
                403,
            );
    }
}
