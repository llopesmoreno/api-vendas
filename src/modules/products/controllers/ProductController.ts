import {
    CreateProductService,
    ListProductService,
    UpdateProductService,
} from '@modules/services/Products/ProductService';
import {
    CreateProductRequest,
    UpdateProductRequest,
} from '@modules/services/Products/Models/ProductRequest';

import { Request, Response } from 'express';

export default class ProductController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const listProductService = new ListProductService();

        const products = await listProductService.execute().catch(error => {
            throw error;
        });

        return response.json(products);
    }

    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const createProductService = new CreateProductService();
        const { name, price, quantity } = request.body;
        const createProductRequest = new CreateProductRequest(
            name,
            price,
            quantity,
        );
        const product = await createProductService.execute(
            createProductRequest,
        );

        return response.json(product);
    }

    public async update(request: Request, response: Response) {
        const updateProductService = new UpdateProductService();

        const { name, price, quantity, id } = request.body;

        const updateRequest = new UpdateProductRequest(
            name,
            price,
            quantity,
            id,
        );

        const product = await updateProductService.execute(updateRequest);
        return response.json(product);
    }
}
