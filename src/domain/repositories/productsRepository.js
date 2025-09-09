import Product from '../models/productsModel.js';

class ProductsRepository {
   async getAllProducts(query = {}) {
    return await Product.findAll(query);
}
}

export default new ProductsRepository();
