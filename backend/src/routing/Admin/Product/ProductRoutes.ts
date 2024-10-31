import express from 'express';

import { upload } from '../../../configs/multer-config.js';

import ProductController from '../../../controllers/Admin/Products/ProductController.js';
import ProductSKUController from "../../../controllers/Admin/Products/ProductSKUController.js";
import ProductSKUImageController from "../../../controllers/Admin/Products/ProductSKUImageController.js";
import ProductSKUOptionController from "../../../controllers/Admin/Products/ProductSKUOptionController.js";

import AddProductValidator from "../../../validators/Product/AddProductValidator.js";
import AddProductSKUValidator from "../../../validators/Product/AddProductSKUValidator.js";
import UpdateProductSKUValidator from "../../../validators/Product/UpdateProductSKUValidator.js";
import UploadProductSKUImagesValidator from "../../../validators/Product/UploadProductSKUImagesValidator.js";
import ProductSKUOptionValidator from "../../../validators/Product/ProductSKUOptionValidator.js";
import ProductRatingController from "../../../controllers/Client/Product/ProductRatingController.js";
import CreateProductRatingValidator from "../../../validators/Product/AddProductRatingValidator.js";
import isAuth from "../../../middleware/isAuth.js";
import isAuthAdmin from "../../../middleware/isAuthAdmin.js";

const ProductRoutes = express.Router();

// Product
ProductRoutes.get('/products/', isAuth, ProductController.getProducts);
ProductRoutes.post('/products/', [isAuth, ...AddProductValidator], ProductController.createProduct);
ProductRoutes.get('/products/:productID', isAuth, ProductController.getProductByID);
ProductRoutes.patch('/products/:productID', [isAuth, ...AddProductValidator], ProductController.updateProduct);
ProductRoutes.delete('/products/:productID', isAuth, ProductController.deleteProduct);

// Product SKU
ProductRoutes.get('/products/:productID/sku', isAuth, ProductSKUController.getProductSKUs);
ProductRoutes.post('/products/:productID/sku', [isAuth, ...AddProductSKUValidator], ProductSKUController.createProductSKU);
ProductRoutes.patch('/products/:productID/sku/:skuID', [isAuth, ...UpdateProductSKUValidator], ProductSKUController.updateProductSKU);
ProductRoutes.delete('/products/:productID/sku/:skuID', isAuth, ProductSKUController.destroy);

// SKU Images
ProductRoutes.post('/sku-images', [isAuth, upload.array('images'), ...UploadProductSKUImagesValidator], ProductSKUImageController.uploadSKUImages);
ProductRoutes.delete('/sku-images/:imageID', isAuth, ProductSKUImageController.deleteSKUImages);
ProductRoutes.post('/sku-images/:imageID/mark-primary', isAuth, ProductSKUImageController.markAsPrimary);

// SKU Options
ProductRoutes.post('/options/add', [isAuth, ...ProductSKUOptionValidator], ProductSKUOptionController.addOptionToSKU);
ProductRoutes.post('/options/remove', [isAuth, ...ProductSKUOptionValidator], ProductSKUOptionController.removeOptionFromSKU);


export default ProductRoutes;
