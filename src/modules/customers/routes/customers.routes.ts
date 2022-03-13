import { Router } from 'express';
import CustomersController from '../controllers/CustomersController';
import { celebrate } from 'celebrate';
import * as validations from './validations.customers.celebrate';

const router = Router();
const controller = new CustomersController();

router.get('/', controller.index);

router.get(
    '/:id',
    celebrate(validations.ShowCustomerValidations()),
    controller.show,
);

router.post(
    '/',
    celebrate(validations.CreateCustomerValidations()),
    controller.create,
);

router.put(
    '/:id',
    celebrate(validations.UpdateCustomerValidations()),
    controller.update,
);

router.delete(
    '/:id',
    celebrate(validations.DeleteCustomerValidations()),
    controller.delete,
);

export default router;
