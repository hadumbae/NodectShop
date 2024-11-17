import express from 'express';

import { supplierValidator } from '../../validation/validators/SupplierValidators.js';
import { getSuppliers, getPaginatedSuppliers, getSupplierByID, createSupplier, updateSupplier, deleteSupplier, getSupplierProducts } from '../../controllers/Admin/SupplierController.js';
import {createSupplierContactPerson, fetchSupplierContactPerson, updateSupplierContactPerson, deleteSupplierContactPerson} from "../../controllers/Admin/SupplierContactPersonController.js";

import isAuthAdmin from "../../middleware/isAuthAdmin.js";
import validateErrors from "../../middleware/validateErrors.js";
import getPaginatedValidator from "../../validation/validators/GetPaginatedValidator.js";
import SupplierContactPersonValidator from "../../validation/validators/Supplier/SupplierContactPersonValidator.js";

const SupplierAdminRoutes = express.Router();

SupplierAdminRoutes.get('/', [isAuthAdmin], getSuppliers);
SupplierAdminRoutes.post('/create-supplier', [isAuthAdmin, ...supplierValidator, validateErrors], createSupplier);
SupplierAdminRoutes.get('/get-supplier/:supplierID', isAuthAdmin, getSupplierByID);
SupplierAdminRoutes.patch('/get-supplier/:supplierID', [isAuthAdmin, ...supplierValidator, validateErrors], updateSupplier);
SupplierAdminRoutes.delete('/get-supplier/:supplierID', isAuthAdmin, deleteSupplier);

SupplierAdminRoutes.get('/get-paginated', [isAuthAdmin, ...getPaginatedValidator], getPaginatedSuppliers);

SupplierAdminRoutes.get('/supplier/:supplierID/products', isAuthAdmin, getSupplierProducts);

SupplierAdminRoutes.post('/supplier/:supplierID/contact-persons', [isAuthAdmin, ...SupplierContactPersonValidator, validateErrors], createSupplierContactPerson);
SupplierAdminRoutes.get('/supplier/:supplierID/contact-persons/:contactID', [isAuthAdmin, ...SupplierContactPersonValidator], fetchSupplierContactPerson);
SupplierAdminRoutes.patch('/supplier/:supplierID/contact-persons/:contactID', [isAuthAdmin, ...SupplierContactPersonValidator, validateErrors], updateSupplierContactPerson);
SupplierAdminRoutes.delete('/supplier/:supplierID/contact-persons/:contactID', [isAuthAdmin, ...SupplierContactPersonValidator], deleteSupplierContactPerson);

export default SupplierAdminRoutes;
