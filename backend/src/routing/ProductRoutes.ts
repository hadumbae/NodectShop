import express from 'express';

import { upload } from '../internal/configs/multer-config.js';

import ProductController from '../controllers/Products/ProductController.js';
import ProductSKUController from "../controllers/Products/ProductSKUController.js";
import ProductSKUImageController from "../controllers/Products/ProductSKUImageController.js";

import AddProductValidator from "../internal/validators/Product/AddProductValidator.js";
import AddProductSKUValidator from "../internal/validators/Product/AddProductSKUValidator.js";
import UpdateProductSKUValidator from "../internal/validators/Product/UpdateProductSKUValidator.js";
import UploadProductSKUImagesValidator from "../internal/validators/Product/UploadProductSKUImagesValidator.js";

const ProductRoutes = express.Router();

// Product SKU
ProductRoutes.post('/sku', AddProductSKUValidator, ProductSKUController.createProductSKU);
ProductRoutes.patch('/sku/:skuID', UpdateProductSKUValidator, ProductSKUController.updateProductSKU);
ProductRoutes.delete('/sku/:skuID', ProductSKUController.destroy);

// SKU Images
ProductRoutes.post('/sku/:skuID/images', [upload.array('images'), ...UploadProductSKUImagesValidator], ProductSKUImageController.uploadSKUImages);
ProductRoutes.delete('/sku/:skuID/images/:imageID', ProductSKUImageController.deleteSKUImages);
ProductRoutes.post('/sku/:skuID/images/:imageID/mark-primary', ProductSKUImageController.markAsPrimary);

// Product
ProductRoutes.get('/', ProductController.getProducts);
ProductRoutes.post('/', AddProductValidator, ProductController.createProduct);
ProductRoutes.get('/:productID', ProductController.getProductByID);
ProductRoutes.patch('/:productID', AddProductValidator, ProductController.updateProduct);
ProductRoutes.delete('/:productID', ProductController.deleteProduct);

export default ProductRoutes;
