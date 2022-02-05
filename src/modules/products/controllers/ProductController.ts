import CreateProductService from '@modules/services/Products/CreateProductService';
import ListProductService from '@modules/services/Products/ListProductService';
import { Request, Response } from 'express';

export default class ProductController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const createProductService = new CreateProductService();
        const { name, price, quantity } = request.body;
        const product = await createProductService.execute(
            name,
            price,
            quantity,
        );

        return response.json(product);
    }

    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const listProductService = new ListProductService();

        const products = await listProductService.execute();

        return response.json(products);
    }
}
