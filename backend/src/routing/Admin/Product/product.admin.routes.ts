import express from 'express';

import {getProducts} from "../product.paginated.controller.js";
import {createProduct, getProductByID, updateProduct,deleteProduct} from '../../../controllers/Admin/Products/ProductController.js';

import isAuth from "../../../middleware/isAuth.js";
import {upload} from "../../../configs/multer-config.js";

import getPaginatedValidator from "../../../validation/validators/GetPaginatedValidator.js";
import {addProductValidator} from "../../../validation/validators/Product/Product/ProductValidators.js";
import validateErrors from "../../../middleware/validateErrors.js";


const ProductAdminRoutes = express.Router();

ProductAdminRoutes.get('/get-all', [isAuth, ...getPaginatedValidator], getProducts);
ProductAdminRoutes.post('/create-product', [isAuth, upload.single('image'), ...addProductValidator, validateErrors], createProduct);
ProductAdminRoutes.get('/get-product/:productID', isAuth, getProductByID);
ProductAdminRoutes.patch('/update-product/:productID', [isAuth], updateProduct);
ProductAdminRoutes.delete('/delete-product/:productID', isAuth, deleteProduct);

export default ProductAdminRoutes;