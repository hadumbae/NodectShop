import { body, param } from 'express-validator';
import mongoose from 'mongoose';
import createError from 'http-errors';

import ProductAdminService from '../../../../services/Product/product.admin.service.js';

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
];
