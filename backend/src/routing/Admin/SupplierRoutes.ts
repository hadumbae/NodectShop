import express from 'express';

import { addSupplierValidator, addSupplierContactPersonValidator } from '../../validators/SupplierValidators.js';
import { getSuppliers, getSupplierByID, createSupplier, updateSupplier, deleteSupplier, updateSupplierContacts } from '../../controllers/Admin/SupplierController.js';
import isAuthAdmin from "../../middleware/isAuthAdmin.js";

const SupplierRoutes = express.Router();

// CRUD
SupplierRoutes.get('/', isAuthAdmin, getSuppliers);
SupplierRoutes.post('/', [isAuthAdmin, ...addSupplierValidator], createSupplier);
SupplierRoutes.get('/:id', isAuthAdmin, getSupplierByID);
SupplierRoutes.patch('/:id', [isAuthAdmin, ...addSupplierValidator], updateSupplier);
SupplierRoutes.delete('/:id', isAuthAdmin, deleteSupplier);

SupplierRoutes.patch('/:id/contact-persons', [isAuthAdmin, ...addSupplierContactPersonValidator], updateSupplierContacts);

export default SupplierRoutes;
