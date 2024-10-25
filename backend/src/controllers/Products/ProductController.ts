import mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { isHttpError } from 'http-errors';

import ProductService from '../../services/ProductService.js';

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const products = await ProductService.find();
		return res.status(200).json({ data: products });
	} catch (error) {
		if (!isHttpError(error)) res.status(500);
		next(error);
	}
};

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
	const data = req.body;
	const image = req.file;

	console.log(data.title);

	const errors = validationResult(req);

	console.log('Errors: ', errors.array());

	if (!errors.isEmpty()) {
		return res.status(400).json({ message: 'Validation failed.', errors: errors.array() });
	}

	try {
		const product = await ProductService.create(data, image);
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

		const product = await ProductService.findByIDOr404({ _id: productID });
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
};
