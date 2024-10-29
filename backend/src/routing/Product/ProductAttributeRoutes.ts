import express from 'express';

import ProductAttributeController from "../../controllers/Products/ProductAttributeController.js";
import ProductAttributeOptionController from "../../controllers/Products/ProductAttributeOptionController.js";

import AddProductAttributeValidator from "../../validators/Product/AddProductAttributeValidator.js";
import UpdateProductAttributeValidatorProduct from "../../validators/Product/UpdateProductAttributeValidator.js";

import AddProductAttributeOptionValidator from "../../validators/Product/AddProductAttributeOptionValidator.js";
import UpdateProductAttributeOptionValidator from "../../validators/Product/UpdateProductAttributeOptionValidator.js";

const ProductAttributeRoutes = express.Router();

// Product SKU
ProductAttributeRoutes.get('/', ProductAttributeController.getAttributes);
ProductAttributeRoutes.post('/', AddProductAttributeValidator, ProductAttributeController.createAttribute);
ProductAttributeRoutes.get('/:attributeID', ProductAttributeController.getAttributeByID);
ProductAttributeRoutes.patch('/:attributeID', UpdateProductAttributeValidatorProduct, ProductAttributeController.updateAttribute);
ProductAttributeRoutes.delete('/:attributeID', ProductAttributeController.deleteAttribute);

// Attribute Options
ProductAttributeRoutes.get('/:attributeID/options', ProductAttributeOptionController.getAttributeOptions);
ProductAttributeRoutes.post('/:attributeID/options', AddProductAttributeOptionValidator, ProductAttributeOptionController.createAttributeOption);
ProductAttributeRoutes.patch('/:attributeID/options/:optionID', UpdateProductAttributeOptionValidator, ProductAttributeOptionController.updateAttributeOption);
ProductAttributeRoutes.delete('/:attributeID/options/:optionID', ProductAttributeOptionController.deleteAttributeOption);

export default ProductAttributeRoutes;
