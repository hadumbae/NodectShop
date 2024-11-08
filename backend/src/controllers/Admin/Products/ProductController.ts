import mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { isHttpError } from 'http-errors';

import ProductService from '../../../services/ProductService.js';
import asyncHandler from "../../../middleware/asyncHandler.js";
import ProductRepository from "../../../repositories/ProductRepository.js";

export const getProducts = asyncHandler(async (req: Request, res: Response, next: NextFunction)=> {
	const conditions = {};

	const currentPage = req.query.page || 1;
	const perPage = req.query.perPage || 15;

	if (req.query.title) {
		conditions['title'] = { $regex: `.*${req.query.title}.*`, $options: 'i' }
	}


	const totalItems = await ProductRepository.count(conditions);
	const products = await ProductService.fetchPaginatedProducts(currentPage, perPage, conditions);
	return res.status(200).json({ data: {products, totalItems} });
});

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ message: 'Validation failed.', errors: errors.array() });
		}

		const data = req.body;
		const product = await ProductService.create(data);
		return res.status(200).json({ data: product });
	} catch (error) {
		if (!isHttpError(error)) res.status(500);
		next(error);
	}
};

export const getProductByID = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { productID } = req.params;
		if (!mongoose.Types.ObjectId.isValid(productID)) {
			return res.status(400).json({ message: 'Invalid ID.' });
		}

		const product = await ProductService.fetchPopulatedProduct(productID);
		return res.status(200).json({ data: product });
	} catch (error) {
		if (!isHttpError(error)) res.status(500);
		next(error);
	}
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { productID } = req.params;
		const data = req.body;

		console.log(data);

		if (!mongoose.Types.ObjectId.isValid(productID)) {
			return res.status(400).json({ message: 'Invalid ID.' });
		}

		const product = await ProductService.update(productID, data);
		res.status(200).json({ message: 'Product Updated.', data: product });
	} catch (error) {
		if (!isHttpError(error)) res.status(500);
		next(error);
	}
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { productID } = req.params;

		if (!mongoose.Types.ObjectId.isValid(productID)) {
			return res.status(400).json({ message: 'Invalid ID.' });
		}

		const deletedProduct = await ProductService.destroy(productID);
		res.status(200).json({ message: 'Product Deleted.', deletedProduct: deletedProduct });
	} catch (error) {
		if (!isHttpError(error)) res.status(500);
		next(error);
	}
}
