import express from 'express';

import { upload } from '../internal/configs/multer-config.js';
import { addProductValidator, updateProductValidator } from '../internal/validators/ProductValidators.js';

import { getProducts, getProductByID, createProduct, updateProduct, deleteProduct } from '../controllers/Products/ProductController.js';
import { updateMainImage, uploadSubImages, deleteSubImage } from '../controllers/Products/ProductImageController.js';

const ProductRoutes = express.Router();

// CRUD
ProductRoutes.get('/', getProducts);
ProductRoutes.post('/', [upload.single('image'), ...addProductValidator], createProduct);
ProductRoutes.get('/:productID', getProductByID);
ProductRoutes.patch('/:productID', updateProductValidator, updateProduct);
ProductRoutes.delete('/:productID', deleteProduct);

// Images
ProductRoutes.post('/:productID/images/main', upload.single('image'), updateMainImage);
ProductRoutes.post('/:productID/images/sub', upload.array('images', 10), uploadSubImages);
ProductRoutes.delete('/:productID/images/sub/:subID', deleteSubImage);

export default ProductRoutes;
