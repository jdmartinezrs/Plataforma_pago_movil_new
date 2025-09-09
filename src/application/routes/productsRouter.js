// src/routes/productsRouter.js
import { Router } from 'express';
import ProductsController from '../controllers/productsController.js';
import ProductsValidator from '../validator/productsValidator.js';

const router = Router();

router.get('/searchAllProducts', 
    ProductsValidator.validateProductData(), 
    (req, res) => ProductsController.getAllProductsController(req, res)
);

export default router;
