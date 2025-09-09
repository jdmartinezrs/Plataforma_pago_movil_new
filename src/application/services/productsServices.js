// src/services/productsService.js
import ProductsRepository from '../../domain/repositories/productsRepository.js';

class ProductsService {

async getAllProducts(query = {}) {
    return await ProductsRepository.getAllProducts(query);
    
}
}
export default new ProductsService();
