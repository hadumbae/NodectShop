import express from 'express';

import { supplierValidator } from '../../validators/SupplierValidators.js';
import { getSuppliers, getPaginatedSuppliers, getSupplierByID, createSupplier, updateSupplier, deleteSupplier, getSupplierProducts } from '../../controllers/Admin/SupplierController.js';
import {createSupplierContactPerson, fetchSupplierContactPerson, updateSupplierContactPerson, deleteSupplierContactPerson} from "../../controllers/Admin/SupplierContactPersonController.js";

import isAuthAdmin from "../../middleware/isAuthAdmin.js";
import validateErrors from "../../middleware/validateErrors.js";
import getPaginatedValidator from "../../validators/GetPaginatedValidator.js";
import SupplierContactPersonValidator from "../../validators/Supplier/SupplierContactPersonValidator.js";

const SupplierRoutes = express.Router();

SupplierRoutes.get('/', [isAuthAdmin], getSuppliers);
SupplierRoutes.post('/', [isAuthAdmin, ...supplierValidator, validateErrors], createSupplier);
SupplierRoutes.get('/supplier/:supplierID', isAuthAdmin, getSupplierByID);
SupplierRoutes.patch('/supplier/:supplierID', [isAuthAdmin, ...supplierValidator, validateErrors], updateSupplier);
SupplierRoutes.delete('/supplier/:supplierID', isAuthAdmin, deleteSupplier);

SupplierRoutes.get('/paginated', [isAuthAdmin, ...getPaginatedValidator], getPaginatedSuppliers);

SupplierRoutes.get('/supplier/:supplierID/products', isAuthAdmin, getSupplierProducts);

SupplierRoutes.post('/supplier/:supplierID/contact-persons', [isAuthAdmin, ...SupplierContactPersonValidator, validateErrors], createSupplierContactPerson);
SupplierRoutes.get('/supplier/:supplierID/contact-persons/:contactID', [isAuthAdmin, ...SupplierContactPersonValidator], fetchSupplierContactPerson);
SupplierRoutes.patch('/supplier/:supplierID/contact-persons/:contactID', [isAuthAdmin, ...SupplierContactPersonValidator, validateErrors], updateSupplierContactPerson);
SupplierRoutes.delete('/supplier/:supplierID/contact-persons/:contactID', [isAuthAdmin, ...SupplierContactPersonValidator], deleteSupplierContactPerson);

export default SupplierRoutes;
