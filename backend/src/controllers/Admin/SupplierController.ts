import createHttpError, { isHttpError } from 'http-errors';
import { validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import SupplierService from '../../services/Supplier/SupplierService.js';
import SupplierRepository from "../../repositories/SupplierRepository.js";
import asyncHandler from "../../middleware/asyncHandler.js";
import ProductService from "../../services/ProductService.js";
import ProductRepository from "../../repositories/ProductRepository.js";

export const getSuppliers = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
	const page = req.query.page || 1;
	const perPage = req.query.perPage || 15;

	const totalItems = await SupplierRepository.count();
	const suppliers = await SupplierRepository.paginatedLean(page, perPage);

	return res.status(200).json({ message: "Suppliers fetched successfully.", data: {suppliers: suppliers, totalItems: totalItems} });
});

export const createSupplier = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
	const data = req.body;

	console.log(data);

	const supplier = await SupplierRepository.create(data);
	return res.status(200).json({ message: "Supplier created successfully.", data: supplier });
});

export const getSupplierByID = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
	const supplierID = req.params.supplierID;
	const supplier = await SupplierRepository.existsOr404Lean(supplierID);

	return res.status(200).json({ message: "Supplier fetched sucessfully.", data: supplier });
});

export const updateSupplier = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
	const supplierID = req.params.supplierID;
	const data = req.body;

	await SupplierRepository.findByIdAndUpdate(supplierID, data);
	res.status(200).json({ message: 'Supplier Updated.' });
});

export const deleteSupplier = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
	const supplierID = req.params.supplierID;
	await SupplierRepository.deleteOne(supplierID);

	res.status(200).json({ message: 'Supplier Deleted.' });
});

export const getSupplierProducts = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
	const supplierID = req.params.supplierID;

	const page = req.query.page || 1;
	const perPage = req.query.perPage || 15;

	const totalItems = await ProductRepository.count({supplier: supplierID});
	const products = await SupplierService.fetchPaginatedProducts(supplierID, page, perPage, totalItems);

	return res.status(200).json({message: 'Supplier Products Retrieved.', data: {totalItems, products}});
});


