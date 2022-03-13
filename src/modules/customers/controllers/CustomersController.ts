import { Request, Response } from 'express';
import * as CustomerServices from '@modules/customers/services/CustomersServices';

export default class UsersController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const service = new CustomerServices.ListCustomerService();

        const customers = await service.execute();

        return response.json(customers);
    }

    public async show(request: Request, response: Response): Promise<Response> {
        const service = new CustomerServices.ShowCustomerService();

        const { id } = request.params;

        const customer = await service.execute({ id });

        return response.json(customer);
    }

    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const service = new CustomerServices.CreateCustomerService();

        const { name, email } = request.body;

        const customer = await service.execute({
            name,
            email,
        });

        return response.json(customer);
    }

    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const service = new CustomerServices.UpdateCustomerService();

        const { name, email } = request.body;
        const { id } = request.params;

        const customer = await service.execute({ id, name, email });

        return response.json(customer);
    }

    public async delete(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const service = new CustomerServices.DeleteCustomerService();

        const { id } = request.params;

        await service.execute({ id });

        return response.status(204).json();
    }
}
