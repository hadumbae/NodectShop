import express from 'express';

import { supplierValidator } from '../../validators/SupplierValidators.js';
import { getSuppliers, getSupplierByID, createSupplier, updateSupplier, deleteSupplier, getSupplierProducts } from '../../controllers/Admin/SupplierController.js';
import {createSupplierContactPerson, fetchSupplierContactPerson, updateSupplierContactPerson, deleteSupplierContactPerson} from "../../controllers/Admin/SupplierContactPersonController.js";

import isAuthAdmin from "../../middleware/isAuthAdmin.js";
import validateErrors from "../../middleware/validateErrors.js";
import getPaginatedValidator from "../../validators/GetPaginatedValidator.js";
import SupplierContactPersonValidator from "../../validators/Supplier/SupplierContactPersonValidator.js";

const SupplierRoutes = express.Router();

// CRUD
SupplierRoutes.get('/', [isAuthAdmin, ...getPaginatedValidator], getSuppliers);
SupplierRoutes.post('/', [isAuthAdmin, ...supplierValidator, validateErrors], createSupplier);
SupplierRoutes.get('/:supplierID', isAuthAdmin, getSupplierByID);
SupplierRoutes.patch('/:supplierID', [isAuthAdmin, ...supplierValidator, validateErrors], updateSupplier);
SupplierRoutes.delete('/:supplierID', isAuthAdmin, deleteSupplier);

SupplierRoutes.get('/:supplierID/products', isAuthAdmin, getSupplierProducts);

SupplierRoutes.post('/:supplierID/contact-persons', [isAuthAdmin, ...SupplierContactPersonValidator, validateErrors], createSupplierContactPerson);
SupplierRoutes.get('/:supplierID/contact-persons/:contactID', [isAuthAdmin, ...SupplierContactPersonValidator], fetchSupplierContactPerson);
SupplierRoutes.patch('/:supplierID/contact-persons/:contactID', [isAuthAdmin, ...SupplierContactPersonValidator, validateErrors], updateSupplierContactPerson);
SupplierRoutes.delete('/:supplierID/contact-persons/:contactID', [isAuthAdmin, ...SupplierContactPersonValidator], deleteSupplierContactPerson);

export default SupplierRoutes;
