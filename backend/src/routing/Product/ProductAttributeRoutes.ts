import express from 'express';

import ProductAttributeController from "../../controllers/Products/ProductAttributeController.js";
import ProductAttributeOptionController from "../../controllers/Products/ProductAttributeOptionController.js";

import AddProductAttributeValidator from "../../validators/Product/AddProductAttributeValidator.js";
import UpdateProductAttributeValidatorProduct from "../../validators/Product/UpdateProductAttributeValidator.js";

import AddProductAttributeOptionValidator from "../../validators/Product/AddProductAttributeOptionValidator.js";
import UpdateProductAttributeOptionValidator from "../../validators/Product/UpdateProductAttributeOptionValidator.js";

const ProductAttributeRoutes = express.Router();

// Product SKU
ProductAttributeRoutes.get('/attributes', ProductAttributeController.getAttributes);
ProductAttributeRoutes.post('/attributes', AddProductAttributeValidator, ProductAttributeController.createAttribute);
ProductAttributeRoutes.get('/attributes/:attributeID', ProductAttributeController.getAttributeByID);
ProductAttributeRoutes.patch('/attributes/:attributeID', UpdateProductAttributeValidatorProduct, ProductAttributeController.updateAttribute);
ProductAttributeRoutes.delete('/attributes/:attributeID', ProductAttributeController.deleteAttribute);

ProductAttributeRoutes.get('/options', ProductAttributeOptionController.getAttributeOptions);
ProductAttributeRoutes.post('/options', AddProductAttributeOptionValidator, ProductAttributeOptionController.createAttributeOption);
ProductAttributeRoutes.get('/options/:optionID', ProductAttributeOptionController.getAttributeOptionByID);
ProductAttributeRoutes.patch('/options/:optionID', UpdateProductAttributeOptionValidator, ProductAttributeOptionController.updateAttributeOption);
ProductAttributeRoutes.delete('/options/:optionID', ProductAttributeOptionController.deleteAttributeOption);

export default ProductAttributeRoutes;
