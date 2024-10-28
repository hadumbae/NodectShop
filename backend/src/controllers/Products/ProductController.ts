import mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { isHttpError } from 'http-errors';

import ProductService from '../../services/ProductService.js';

export default {
	async getProducts(req: Request, res: Response, next: NextFunction) {
		try {
			const products = await ProductService.find();
			return res.status(200).json({ data: products });
		} catch (error) {
			if (!isHttpError(error)) res.status(500);
			next(error);
		}
	},

	async createProduct(req: Request, res: Response, next: NextFunction)  {
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
	},

	async getProductByID(req: Request, res: Response, next: NextFunction)  {
		try {
			const { productID } = req.params;
			if (!mongoose.Types.ObjectId.isValid(productID)) {
				return res.status(400).json({ message: 'Invalid ID.' });
			}

			const product = await ProductService.existsOr404(productID);
			return res.status(200).json({ data: product });
		} catch (error) {
			if (!isHttpError(error)) res.status(500);
			next(error);
		}
	},

	async updateProduct(req: Request, res: Response, next: NextFunction)  {
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
	},

	async deleteProduct(req: Request, res: Response, next: NextFunction)  {
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
}
