import { Router } from 'express';
import ProductController from '../controllers/ProductController';
import { celebrate } from 'celebrate';
import * as validations from './validations.product.celebrate';

const productsRouter = Router();
const controller = new ProductController();

productsRouter.get('/', controller.index);

productsRouter.get(
    '/:id',
    celebrate(validations.GetProductByIdValidations()),
    controller.getById,
);

productsRouter.post(
    '/',
    celebrate(validations.CreateProductValidations()),
    controller.create,
);

productsRouter.put(
    '/:id',
    celebrate(validations.UpdateProductValidations()),
    controller.update,
);

productsRouter.delete(
    '/:id',
    celebrate(validations.DeleteProductValidations()),
    controller.delete,
);

export default productsRouter;
