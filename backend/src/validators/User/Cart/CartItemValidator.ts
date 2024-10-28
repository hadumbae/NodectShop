import { body } from 'express-validator';
import mongoose from 'mongoose';
import createError from 'http-errors';

import ProductService from '../../../services/ProductService.js';

export default [
	body('quantity')
		.exists()
		.withMessage('Product quantity required.')
		.isNumeric()
		.withMessage('Quantity must be a number.')
		.custom((value, { req }) => {
			if (value <= 0) {
				throw createError(400, 'Quantity must be larger than 0.');
			}

			return true;
		}),
	body('productID')
		.exists()
		.withMessage('Product ID is required')
		.custom(async (value, { req }) => {
			if (!mongoose.Types.ObjectId.isValid(value)) {
				return Promise.reject('Please include a valid product ID.');
			}

			const product = ProductService.findByID(value);

			if (!product) {
				return Promise.reject('Product not found.');
			}
		}),
];
