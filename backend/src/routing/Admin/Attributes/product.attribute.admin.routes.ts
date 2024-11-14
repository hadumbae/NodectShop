import express from 'express';

import ProductAttributeController from "../../../controllers/Admin/Products/ProductAttributeController.js";
import ProductAttributeOptionController from "../../../controllers/Admin/Products/ProductAttributeOptionController.js";

import AddProductAttributeValidator from "../../../validation/validators/Product/Attributes/AddProductAttributeValidator.js";
import UpdateProductAttributeValidatorProduct from "../../../validation/validators/Product/Attributes/UpdateProductAttributeValidator.js";

import AddProductAttributeOptionValidator from "../../../validation/validators/Product/Attributes/AddProductAttributeOptionValidator.js";
import UpdateProductAttributeOptionValidator from "../../../validation/validators/Product/Attributes/UpdateProductAttributeOptionValidator.js";
import isAuthAdmin from "../../../middleware/isAuthAdmin.js";
import getPaginatedValidator from "../../../validation/validators/GetPaginatedValidator.js";

const ProductAttributeAdminRoutes = express.Router();

// Attribute
ProductAttributeAdminRoutes.get('/', [isAuthAdmin, ...getPaginatedValidator], ProductAttributeController.getAttributes);
ProductAttributeAdminRoutes.post('/', [isAuthAdmin, ...AddProductAttributeValidator], ProductAttributeController.createAttribute);
ProductAttributeAdminRoutes.get('/paginated', [isAuthAdmin, ...getPaginatedValidator], ProductAttributeController.getPaginatedAttributes);
ProductAttributeAdminRoutes.get('/attribute/:attributeID', isAuthAdmin, ProductAttributeController.getAttributeByID);
ProductAttributeAdminRoutes.patch('/attribute/:attributeID', [isAuthAdmin, ...UpdateProductAttributeValidatorProduct], ProductAttributeController.updateAttribute);
ProductAttributeAdminRoutes.delete('/attribute/:attributeID', isAuthAdmin, ProductAttributeController.deleteAttribute);

// Attribute Options
ProductAttributeAdminRoutes.get('/attribute/:attributeID/options', isAuthAdmin, ProductAttributeOptionController.getAttributeOptions);
ProductAttributeAdminRoutes.post('/attribute/:attributeID/options', [isAuthAdmin, ...AddProductAttributeOptionValidator], ProductAttributeOptionController.createAttributeOption);
ProductAttributeAdminRoutes.patch('/attribute/:attributeID/options/:optionID', [isAuthAdmin, ...UpdateProductAttributeOptionValidator], ProductAttributeOptionController.updateAttributeOption);
ProductAttributeAdminRoutes.delete('/attribute/:attributeID/options/:optionID', isAuthAdmin, ProductAttributeOptionController.deleteAttributeOption);

export default ProductAttributeAdminRoutes;
