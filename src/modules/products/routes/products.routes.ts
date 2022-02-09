import { Router } from 'express';
import ProductController from '../controllers/ProductController';

const productsRouter = Router();
const controller = new ProductController();

productsRouter.get('/', controller.index);
productsRouter.get('/:id', controller.getById);
productsRouter.post('/', controller.create);
productsRouter.put('/', controller.update);
productsRouter.delete('/:id', controller.delete);

export default productsRouter;
