import express from 'express';

import { addSupplierValidator, addSupplierContactPersonValidator } from '../validators/SupplierValidators.js';
import { getSuppliers, getSupplierByID, createSupplier, updateSupplier, deleteSupplier, updateSupplierContacts } from '../controllers/SupplierController.js';

const SupplierRoutes = express.Router();

// CRUD
SupplierRoutes.get('/', getSuppliers);
SupplierRoutes.post('/', addSupplierValidator, createSupplier);
SupplierRoutes.get('/:id', getSupplierByID);
SupplierRoutes.patch('/:id', addSupplierValidator, updateSupplier);
SupplierRoutes.delete('/:id', deleteSupplier);

SupplierRoutes.patch('/:id/contact-persons', addSupplierContactPersonValidator, updateSupplierContacts);

export default SupplierRoutes;
