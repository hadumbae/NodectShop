import express from 'express';

import { upload } from '../internal/configs/multer-config.js';
import { addProductValidator } from '../internal/validators/ProductValidators.js';

import { getProducts, getProductByID, createProduct, updateProduct, deleteProduct } from '../controllers/Products/ProductController.js';
import { uploadMainImage, deleteMainImage, uploadSubImages, deleteSubImage } from '../controllers/Products/ProductImageController.js';

const ProductRoutes = express.Router();

// CRUD
ProductRoutes.get('/', getProducts);
ProductRoutes.post('/', addProductValidator, createProduct);
ProductRoutes.get('/:productID', getProductByID);
ProductRoutes.patch('/:productID', addProductValidator, updateProduct);
ProductRoutes.delete('/:productID', deleteProduct);

// Images
ProductRoutes.post('/:productID/images/main', upload.single('image'), uploadMainImage);
ProductRoutes.delete('/:productID/images/main', deleteMainImage);
ProductRoutes.post('/:productID/images/sub', upload.array('images', 10), uploadSubImages);
ProductRoutes.delete('/:productID/images/sub/:subID', deleteSubImage);

export default ProductRoutes;
