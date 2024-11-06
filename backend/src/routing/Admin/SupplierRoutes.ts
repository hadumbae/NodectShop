import express from 'express';

import { supplierValidator, addSupplierContactPersonValidator } from '../../validators/SupplierValidators.js';
import { getSuppliers, getSupplierByID, createSupplier, updateSupplier, deleteSupplier, getSupplierProducts } from '../../controllers/Admin/SupplierController.js';
import {createSupplierContactPerson, fetchSupplierContactPerson, updateSupplierContactPerson, deleteSupplierContactPerson} from "../../controllers/Admin/SupplierContactPersonController.js";

import isAuthAdmin from "../../middleware/isAuthAdmin.js";
import validateErrors from "../../middleware/validateErrors.js";
import getPaginatedValidator from "../../validators/GetPaginatedValidator.js";

const SupplierRoutes = express.Router();

// CRUD
SupplierRoutes.get('/', [isAuthAdmin, ...getPaginatedValidator], getSuppliers);
SupplierRoutes.post('/', [isAuthAdmin, ...supplierValidator, validateErrors], createSupplier);
SupplierRoutes.get('/:supplierID', isAuthAdmin, getSupplierByID);
SupplierRoutes.patch('/:supplierID', [isAuthAdmin, ...supplierValidator, validateErrors], updateSupplier);
SupplierRoutes.delete('/:supplierID', isAuthAdmin, deleteSupplier);

SupplierRoutes.get('/:supplierID/products', isAuthAdmin, getSupplierProducts);

SupplierRoutes.get('/:id/contact-persons', [isAuthAdmin, ...addSupplierContactPersonValidator, validateErrors], createSupplierContactPerson);
SupplierRoutes.patch('/:id/contact-persons', [isAuthAdmin, ...addSupplierContactPersonValidator, validateErrors], fetchSupplierContactPerson);
SupplierRoutes.post('/:id/contact-persons', [isAuthAdmin, ...addSupplierContactPersonValidator, validateErrors], updateSupplierContactPerson);
SupplierRoutes.delete('/:id/contact-persons', [isAuthAdmin, ...addSupplierContactPersonValidator, validateErrors], deleteSupplierContactPerson);

export default SupplierRoutes;
