import express from 'express';

import { upload } from '../../../configs/multer-config.js';

import { getProductSKUs, getPaginatedProductSKUs, createProductSKU, fetchProductSKU, updateProductSKU, destroy } from "../../../controllers/Admin/Products/ProductSKUController.js";
import ProductSKUImageController from "../../../controllers/Admin/Products/ProductSKUImageController.js";
import ProductSKUOptionController from "../../../controllers/Admin/Products/ProductSKUOptionController.js";

import AddProductSKUValidator from "../../../validators/Product/AddProductSKUValidator.js";
import UploadProductSKUImagesValidator from "../../../validators/Product/UploadProductSKUImagesValidator.js";
import ProductSKUOptionValidator from "../../../validators/Product/ProductSKUOptionValidator.js";
import isAuth from "../../../middleware/isAuth.js";
import getPaginatedValidator from "../../../validators/GetPaginatedValidator.js";
import validateErrors from "../../../middleware/validateErrors.js";
import UpdateProductSKUValidator from "../../../validators/Product/UpdateProductSKUValidator.js";

const ProductSKURoutes = express.Router();

// Product SKU
ProductSKURoutes.get('/product-sku/:productID/sku', [isAuth, validateErrors], getProductSKUs);
ProductSKURoutes.get('/product-sku/:productID/paginated-sku', [isAuth, ...getPaginatedValidator, validateErrors], getPaginatedProductSKUs);
ProductSKURoutes.post('/product-sku/:productID/sku', [isAuth, ...AddProductSKUValidator], createProductSKU);
ProductSKURoutes.get('/product-sku/:productID/sku/:skuID', [isAuth], fetchProductSKU);
ProductSKURoutes.patch('/product-sku/:productID/sku/:skuID', [isAuth, ...UpdateProductSKUValidator, validateErrors], updateProductSKU);
ProductSKURoutes.delete('/product-sku/:productID/sku/:skuID', [isAuth, validateErrors], destroy);

// SKU Images
ProductSKURoutes.post('/sku-images', [isAuth, upload.array('images'), ...UploadProductSKUImagesValidator], ProductSKUImageController.uploadSKUImages);
ProductSKURoutes.delete('/sku-images/:imageID', isAuth, ProductSKUImageController.deleteSKUImages);
ProductSKURoutes.post('/sku-images/:imageID/mark-primary', isAuth, ProductSKUImageController.markAsPrimary);

// SKU Options
ProductSKURoutes.post('/options/add', [isAuth, ...ProductSKUOptionValidator], ProductSKUOptionController.addOptionToSKU);
ProductSKURoutes.post('/options/remove', [isAuth, ...ProductSKUOptionValidator], ProductSKUOptionController.removeOptionFromSKU);


export default ProductSKURoutes;
