import BaseService from '@shared/BaseService';
import Product from '@modules/products/typeorm/entities/product';
import { ProductRepository } from '@modules/products/typeorm/repositories/productsRepository';
import CreateProductRequest from './Models/ProductModel';

export default class CreateProductService extends BaseService<ProductRepository> {
    constructor() {
        super(ProductRepository);
    }

    public async execute(request: CreateProductRequest) {
        this.checkRequest(request);

        await this.checkProductName(request.name);

        const product = await this.createProduct(
            request.name,
            request.price,
            request.quantity,
        );

        return product;
    }

    private checkRequest(request: CreateProductRequest) {
        if (request.invalidRequest()) {
            const errors = request.getRequestErrors();

            throw this.getError(
                'Os dados da requisição são inválidos',
                400,
                errors,
            );
        }
    }

    private async checkProductName(name: string) {
        const product = await this._repository.findByName(name);
        if (product !== undefined)
            throw this.getError('Já existe um produto com este nome');
    }

    private async createProduct(
        name: string,
        price: number,
        quantity: number,
    ): Promise<Product> {
        const product = this._repository.create({
            name,
            price,
            quantity,
        });

        await this._repository.save(product);

        return product;
    }
}
