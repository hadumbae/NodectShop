import express from 'express';

import {getProducts, createProduct, getProductByID, updateProduct,deleteProduct} from '../../../controllers/Admin/Products/ProductController.js';

import AddProductValidator from "../../../validators/Product/AddProductValidator.js";
import isAuth from "../../../middleware/isAuth.js";
import getPaginatedValidator from "../../../validators/GetPaginatedValidator.js";

const ProductRoutes = express.Router();

ProductRoutes.get('/products', [isAuth, ...getPaginatedValidator], getProducts);
ProductRoutes.post('/products', [isAuth, ...AddProductValidator], createProduct);
ProductRoutes.get('/products/:productID', isAuth, getProductByID);
ProductRoutes.patch('/products/:productID', [isAuth, ...AddProductValidator], updateProduct);
ProductRoutes.delete('/products/:productID', isAuth, deleteProduct);

export default ProductRoutes;
