import * as ProductServices from '@modules/products/services/ProductService';
import {
    CreateProductRequest,
    UpdateProductRequest,
} from '@modules/products/services/Models/ProductRequest';
import { Request, Response } from 'express';

export default class ProductController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const listProductService = new ProductServices.ListProductService();

        const products = await listProductService.execute().catch(error => {
            throw error;
        });

        return response.json(products);
    }

    public async getById(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const service = new ProductServices.GetByIdProductService();
        const { id } = request.params;
        const product = await service.execute(id);

        return response.json(product);
    }

    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const createProductService = new ProductServices.CreateProductService();
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
        const updateProductService = new ProductServices.UpdateProductService();
        const { id } = request.params;
        const { name, price, quantity } = request.body;

        const updateRequest = new UpdateProductRequest(
            name,
            price,
            quantity,
            id,
        );

        const product = await updateProductService.execute(updateRequest);
        return response.json(product);
    }

    public async delete(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const service = new ProductServices.DeleteProductService();
        const { id } = request.params;
        await service.execute(id);
        return response.json([]);
    }
}
