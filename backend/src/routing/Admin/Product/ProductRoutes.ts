import express from 'express';

import { upload } from '../../../configs/multer-config.js';

import {getProducts, createProduct, getProductByID, updateProduct,deleteProduct} from '../../../controllers/Admin/Products/ProductController.js';
import ProductSKUController from "../../../controllers/Admin/Products/ProductSKUController.js";
import ProductSKUImageController from "../../../controllers/Admin/Products/ProductSKUImageController.js";
import ProductSKUOptionController from "../../../controllers/Admin/Products/ProductSKUOptionController.js";

import AddProductValidator from "../../../validators/Product/AddProductValidator.js";
import AddProductSKUValidator from "../../../validators/Product/AddProductSKUValidator.js";
import UpdateProductSKUValidator from "../../../validators/Product/UpdateProductSKUValidator.js";
import UploadProductSKUImagesValidator from "../../../validators/Product/UploadProductSKUImagesValidator.js";
import ProductSKUOptionValidator from "../../../validators/Product/ProductSKUOptionValidator.js";
import isAuth from "../../../middleware/isAuth.js";
import getPaginatedValidator from "../../../validators/GetPaginatedValidator.js";

const ProductRoutes = express.Router();

// Product
ProductRoutes.get('/products', [isAuth, ...getPaginatedValidator], getProducts);
ProductRoutes.post('/products', [isAuth, ...AddProductValidator], createProduct);
ProductRoutes.get('/products/:productID', isAuth, getProductByID);
ProductRoutes.patch('/products/:productID', [isAuth, ...AddProductValidator], updateProduct);
ProductRoutes.delete('/products/:productID', isAuth, deleteProduct);

// Product SKU
ProductRoutes.get('/product-sku/:productID/sku', isAuth, ProductSKUController.getProductSKUs);
ProductRoutes.post('/product-sku/:productID/sku', [isAuth, ...AddProductSKUValidator], ProductSKUController.createProductSKU);
ProductRoutes.patch('/product-sku/:productID/sku/:skuID', [isAuth, ...UpdateProductSKUValidator], ProductSKUController.updateProductSKU);
ProductRoutes.delete('/product-sku/:productID/sku/:skuID', isAuth, ProductSKUController.destroy);

// SKU Images
ProductRoutes.post('/sku-images', [isAuth, upload.array('images'), ...UploadProductSKUImagesValidator], ProductSKUImageController.uploadSKUImages);
ProductRoutes.delete('/sku-images/:imageID', isAuth, ProductSKUImageController.deleteSKUImages);
ProductRoutes.post('/sku-images/:imageID/mark-primary', isAuth, ProductSKUImageController.markAsPrimary);

// SKU Options
ProductRoutes.post('/options/add', [isAuth, ...ProductSKUOptionValidator], ProductSKUOptionController.addOptionToSKU);
ProductRoutes.post('/options/remove', [isAuth, ...ProductSKUOptionValidator], ProductSKUOptionController.removeOptionFromSKU);


export default ProductRoutes;
