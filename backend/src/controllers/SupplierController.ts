import createHttpError, { isHttpError } from 'http-errors';
import { validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import SupplierService from '../services/Supplier/SupplierService.js';

export const getSuppliers = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const suppliers = await SupplierService.find();
		return res.status(200).json({ data: suppliers });
	} catch (error) {
		if (!isHttpError(error)) res.status(500);
		next(error);
	}
};

export const createSupplier = async (req: Request, res: Response, next: NextFunction) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		res.status(400).json({ message: 'Validation failed.', errors: errors.array() });
	}

	try {
		const data = req.body;
		const supplier = await SupplierService.create(data);

		return res.status(200).json({ data: supplier });
	} catch (error) {
		if (!isHttpError(error)) res.status(500);
		next(error);
	}
};

export const getSupplierByID = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const supplierID = req.params.id;
		const supplier = await SupplierService.existsOr404({ _id: supplierID });

		return res.status(200).json({ data: supplier });
	} catch (error) {
		if (!isHttpError(error)) res.status(500);
		next(error);
	}
};

export const updateSupplier = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const supplierID = req.params.id;
		const data = req.body;

		await SupplierService.update(supplierID, data);
		res.status(200).json({ message: 'Supplier Updated.' });
	} catch (error) {
		if (!isHttpError(error)) res.status(500);
		next(error);
	}
};

export const deleteSupplier = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const supplierID = req.params.id;
		await SupplierService.destroy(supplierID);

		res.status(200).json({ message: 'Supplier Deleted.' });
	} catch (error) {
		if (!isHttpError(error)) res.status(500);
		next(error);
	}
};

export const updateSupplierContacts = async (req: Request, res: Response, next: NextFunction) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		res.status(400).json({ message: 'Validation failed.', errors: errors.array() });
	}

	try {
		const supplierID = req.params.id;
		const data = req.body;

		console.log(data.contactPersons);

		if (!data.contactPersons || Object.prototype.toString.call(data.contactPersons) != '[object Array]') {
			throw createHttpError(400, "Invalid Data. Required Format : '{contactPersons: []}' ");
		}

		const supplier = await SupplierService.updateContactPersons(supplierID, data.contactPersons);

		return res.status(200).json({ message: 'Contact Person Details Updated.', supplier: supplier });
	} catch (error) {
		if (!isHttpError(error)) res.status(500);
		next(error);
	}
};
