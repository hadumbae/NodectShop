import { body, param } from 'express-validator';
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
	body('skuID')
		.exists().withMessage('Product SKU ID is required')
		.custom(async (value, { req }) => {
			if (!mongoose.Types.ObjectId.isValid(value)) return Promise.reject('Invalid SKU ID Format.');
		}),
	param('userID')
		.exists().withMessage('User ID is required')
		.custom(async (value, { req }) => {
			if (!mongoose.Types.ObjectId.isValid(value)) return Promise.reject('Invalid User ID Format.');
		}),
];
