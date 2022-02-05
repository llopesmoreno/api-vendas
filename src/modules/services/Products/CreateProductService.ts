import BaseService from '../BaseService';
import Product from '@modules/products/typeorm/entities/product';
import { ProductRepository } from '@modules/products/typeorm/repositories/productsRepository';

class CreateProductRequest {
    readonly name: string;
    readonly price: number;
    readonly quantity: number;

    constructor(name: string, price: number, quantity: number) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }

    public invalidName(): boolean {
        return (
            this.name === '' || this.name === undefined || this.name === null
        );
    }

    public invalidPrice(): boolean {
        return (
            this.price === undefined || this.price === null || this.price <= 0
        );
    }
    public invalidQuantity(): boolean {
        return (
            this.quantity === undefined ||
            this.quantity === null ||
            this.quantity <= 0
        );
    }

    public invalidRequest(): boolean {
        return (
            this.invalidName() || this.invalidPrice() || this.invalidQuantity()
        );
    }
}

class CreateProductService extends BaseService<ProductRepository> {
    constructor() {
        super(ProductRepository);
    }

    public async execute(name: string, price: number, quantity: number) {
        const request = new CreateProductRequest(name, price, quantity);

        if (request.invalidRequest()) {
            const errors = this.getRequestErrors(request);

            throw this.getError(
                'Os dados da requisição são inválidos',
                400,
                errors,
            );
        }

        if (await this.productExists(request.name)) {
            throw this.getError('Já existe um produto com este nome');
        }

        const product = await this.createProduct(
            request.name,
            request.price,
            request.quantity,
        );

        return product;
    }

    private getRequestErrors(request: CreateProductRequest): string[] {
        const errors = [];

        if (request.invalidName()) {
            errors.push('O nome é inválido');
        }
        if (request.invalidPrice()) {
            errors.push('O preço deve ser maior que 0.');
        }
        if (request.invalidQuantity()) {
            errors.push('A quantidade deve ser maior ou igual a 0.');
        }

        return errors;
    }

    private async productExists(name: string): Promise<boolean> {
        const product = await this._repository.findByName(name);
        console.log(product);
        return product !== undefined;
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

export default CreateProductService;
