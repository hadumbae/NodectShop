import express from 'express';

import { upload } from '../../../configs/multer-config.js';

import { getProductSKUs, getPaginatedProductSKUs, createProductSKU, fetchProductSKU, updateProductSKU, destroy } from "../../../controllers/Admin/Products/ProductSKUController.js";
import ProductSKUImageController from "../../../controllers/Admin/Products/ProductSKUImageController.js";
import ProductSKUOptionController from "../../../controllers/Admin/Products/ProductSKUOptionController.js";

import AddProductSKUValidator from "../../../validation/validators/Product/SKU/AddProductSKUValidator.js";
import UploadProductSKUImagesValidator from "../../../validation/validators/Product/SKU/UploadProductSKUImagesValidator.js";
import ProductSKUOptionValidator from "../../../validation/validators/Product/SKU/ProductSKUOptionValidator.js";
import isAuth from "../../../middleware/isAuth.js";
import getPaginatedValidator from "../../../validation/validators/GetPaginatedValidator.js";
import validateErrors from "../../../middleware/validateErrors.js";
import UpdateProductSKUValidator from "../../../validation/validators/Product/SKU/UpdateProductSKUValidator.js";

const ProductSkuAdminRoutes = express.Router();

// Product SKU
ProductSkuAdminRoutes.get('/product-sku/:productID/sku', [isAuth, validateErrors], getProductSKUs);
ProductSkuAdminRoutes.get('/product-sku/:productID/paginated-sku', [isAuth, ...getPaginatedValidator, validateErrors], getPaginatedProductSKUs);
ProductSkuAdminRoutes.post('/product-sku/:productID/sku', [isAuth, ...AddProductSKUValidator], createProductSKU);
ProductSkuAdminRoutes.get('/product-sku/:productID/sku/:skuID', [isAuth], fetchProductSKU);
ProductSkuAdminRoutes.patch('/product-sku/:productID/sku/:skuID', [isAuth, ...UpdateProductSKUValidator, validateErrors], updateProductSKU);
ProductSkuAdminRoutes.delete('/product-sku/:productID/sku/:skuID', [isAuth, validateErrors], destroy);

// SKU Images
ProductSkuAdminRoutes.post('/sku-images', [isAuth, upload.array('images'), ...UploadProductSKUImagesValidator], ProductSKUImageController.uploadSKUImages);
ProductSkuAdminRoutes.delete('/sku-images/:imageID', isAuth, ProductSKUImageController.deleteSKUImages);
ProductSkuAdminRoutes.post('/sku-images/:imageID/mark-primary', isAuth, ProductSKUImageController.markAsPrimary);

// SKU Options
ProductSkuAdminRoutes.post('/options/add', [isAuth, ...ProductSKUOptionValidator], ProductSKUOptionController.addOptionToSKU);
ProductSkuAdminRoutes.post('/options/remove', [isAuth, ...ProductSKUOptionValidator], ProductSKUOptionController.removeOptionFromSKU);


export default ProductSkuAdminRoutes;
