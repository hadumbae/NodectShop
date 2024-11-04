import express from 'express';

import ProductAttributeController from "../../../controllers/Admin/Products/ProductAttributeController.js";
import ProductAttributeOptionController from "../../../controllers/Admin/Products/ProductAttributeOptionController.js";

import AddProductAttributeValidator from "../../../validators/Product/Attributes/AddProductAttributeValidator.js";
import UpdateProductAttributeValidatorProduct from "../../../validators/Product/Attributes/UpdateProductAttributeValidator.js";

import AddProductAttributeOptionValidator from "../../../validators/Product/Attributes/AddProductAttributeOptionValidator.js";
import UpdateProductAttributeOptionValidator from "../../../validators/Product/Attributes/UpdateProductAttributeOptionValidator.js";
import isAuthAdmin from "../../../middleware/isAuthAdmin.js";
import getPaginatedValidator from "../../../validators/GetPaginatedValidator.js";

const ProductAttributeRoutes = express.Router();

// Attribute
ProductAttributeRoutes.get('/', [isAuthAdmin, ...getPaginatedValidator], ProductAttributeController.getAttributes);
ProductAttributeRoutes.post('/', [isAuthAdmin, ...AddProductAttributeValidator], ProductAttributeController.createAttribute);
ProductAttributeRoutes.get('/:attributeID', isAuthAdmin, ProductAttributeController.getAttributeByID);
ProductAttributeRoutes.patch('/:attributeID', [isAuthAdmin, ...UpdateProductAttributeValidatorProduct], ProductAttributeController.updateAttribute);
ProductAttributeRoutes.delete('/:attributeID', isAuthAdmin, ProductAttributeController.deleteAttribute);

// Attribute Options
ProductAttributeRoutes.get('/:attributeID/options', isAuthAdmin, ProductAttributeOptionController.getAttributeOptions);
ProductAttributeRoutes.post('/:attributeID/options', [isAuthAdmin, ...AddProductAttributeOptionValidator], ProductAttributeOptionController.createAttributeOption);
ProductAttributeRoutes.patch('/:attributeID/options/:optionID', [isAuthAdmin, ...UpdateProductAttributeOptionValidator], ProductAttributeOptionController.updateAttributeOption);
ProductAttributeRoutes.delete('/:attributeID/options/:optionID', isAuthAdmin, ProductAttributeOptionController.deleteAttributeOption);

export default ProductAttributeRoutes;
