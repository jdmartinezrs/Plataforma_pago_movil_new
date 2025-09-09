import ProductsService from '../services/productsServices.js';

class ProductsController {

    async getAllProductsController(req, res) {
        try {
            const products = await ProductsService.getAllProducts(req.query);
            res.json(products);
        } catch (err) {
            res.status(500).json({ message: 'Error al obtener productos', error: err.message });
        }
    }

}

export default new ProductsController();
