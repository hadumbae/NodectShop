import express from 'express';

import {createProduct, getProductByID, updateProduct,deleteProduct} from '../../../controllers/Admin/Products/ProductController.js';

import isAuth from "../../../middleware/isAuth.js";
import {upload} from "../../../configs/multer-config.js";

import getPaginatedValidator from "../../../validation/validators/GetPaginatedValidator.js";
import { addProductValidator, updateProductValidator } from "../../../validation/validators/Product/Product/ProductValidators.js";
import validateErrors from "../../../middleware/validateErrors.js";
import {fetchAllProductTypesAndTags, getFilteredProducts} from "./product.filter.controller.js";


const ProductAdminRoutes = express.Router();

ProductAdminRoutes.post('/create-product', [isAuth, upload.single('image'), ...addProductValidator, validateErrors], createProduct);
ProductAdminRoutes.get('/get-product/:productID', isAuth, getProductByID);
ProductAdminRoutes.patch('/update-product/:productID', [isAuth, upload.single('image'), ...updateProductValidator, validateErrors], updateProduct);
ProductAdminRoutes.delete('/delete-product/:productID', isAuth, deleteProduct);

// Filter
ProductAdminRoutes.get('/filter/data', [isAuth, ...getPaginatedValidator], getFilteredProducts);
ProductAdminRoutes.get('/filter/data/types-and-tags', fetchAllProductTypesAndTags);


export default ProductAdminRoutes;
