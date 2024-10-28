import express from 'express';

import { upload } from '../../configs/multer-config.js';

import ProductController from '../../controllers/Products/ProductController.js';
import ProductSKUController from "../../controllers/Products/ProductSKUController.js";
import ProductSKUImageController from "../../controllers/Products/ProductSKUImageController.js";

import AddProductValidator from "../../validators/Product/AddProductValidator.js";
import AddProductSKUValidator from "../../validators/Product/AddProductSKUValidator.js";
import UpdateProductSKUValidator from "../../validators/Product/UpdateProductSKUValidator.js";
import UploadProductSKUImagesValidator from "../../validators/Product/UploadProductSKUImagesValidator.js";

const ProductRoutes = express.Router();

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

// Product SKU
ProductRoutes.post('/:productID/sku', AddProductSKUValidator, ProductSKUController.createProductSKU);
ProductRoutes.patch('/:productID/sku/:skuID', UpdateProductSKUValidator, ProductSKUController.updateProductSKU);
ProductRoutes.delete('/:productID/sku/:skuID', ProductSKUController.destroy);


export default ProductRoutes;
