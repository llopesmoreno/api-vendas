import BaseService from '@shared/BaseService';
import { Customer } from '../typeorm/entities/Customer';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

interface IRequest {
    id: string;
    name: string;
    email: string;
}

export default class UpdateCustomerService extends BaseService<CustomersRepository> {
    constructor() {
        super(CustomersRepository);
    }

    public async execute({ id, name, email }: IRequest): Promise<Customer> {
        const customer = await this.getCustomer(id);

        await this.verifyEmailExists(customer, email);

        return await this.saveCustomer(customer, name, email);
    }

    private async getCustomer(id: string): Promise<Customer> {
        const customer = await this._repository.findById(id);

        if (!customer) throw this.getError('Cliente não encontrado', 404);

        return customer;
    }

    private async verifyEmailExists(customer: Customer, email: string) {
        if (customer.email === email) return;

        const customerExists = await this._repository.findByEmail(email);
        if (customerExists)
            throw this.getError(
                'Já existe um cliente cadastrado com este e-mail',
                403,
            );
    }

    private async saveCustomer(
        customer: Customer,
        name: string,
        email: string,
    ): Promise<Customer> {
        customer.email = email;
        customer.name = name;

        await this._repository.save(customer);

        return customer;
    }
}
