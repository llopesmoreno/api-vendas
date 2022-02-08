import { Router } from 'express';
import ProductController from '../controllers/ProductController';

const productsRouter = Router();
const controller = new ProductController();

productsRouter.get('/', controller.index);
productsRouter.post('/', controller.create);
productsRouter.put('/', controller.update);

export default productsRouter;
