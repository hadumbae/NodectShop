import express from 'express';

import { addProductValidator } from '../internal/validators/ProductValidators.js';
import { getProducts, getProductByID, createProduct, updateProduct, deleteProduct } from '../controllers/ProductController.js';

const ProductRoutes = express.Router();

// CRUD
ProductRoutes.get('/', getProducts);
ProductRoutes.post('/', addProductValidator, createProduct);
ProductRoutes.get('/:id', getProductByID);
ProductRoutes.patch('/:id', addProductValidator, updateProduct);
ProductRoutes.delete('/:id', deleteProduct);

export default ProductRoutes;
