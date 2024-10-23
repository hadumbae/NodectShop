import { body } from 'express-validator';
import mongoose from 'mongoose';
import ProductService from '../../services/ProductService.js';
import createError from 'http-errors';

export const addProductValidator = [
	body('title')
		.not()
		.isEmpty()
		.withMessage('Title is required.')
		.isString()
		.withMessage('Title must be a string.')
		.isLength({ min: 3 })
		.withMessage('Product title must be at least 3 letters long.')
		.custom(async (value) => {
			const productCheck = await ProductService.findOne({ title: value });

			if (productCheck) {
				return Promise.reject('Product with title already exists. Please try again.');
			}
		}),

	body('description')
		.not()
		.isEmpty()
		.withMessage('Title is required.')
		.isString()
		.withMessage('description required.')
		.isLength({ min: 10 })
		.withMessage('Description must be at least ten letters long.'),

	body('unitPrice')
		.not()
		.isEmpty()
		.withMessage('Title is required.')
		.isFloat()
		.withMessage('Unit price must be a float.')
		.custom((value) => {
			if (value <= 0) {
				throw createError(400, 'Unit Price cannot be zero or less. Please be careful.');
			}

			return true;
		}),

	body('unitStock')
		.not()
		.isEmpty()
		.withMessage('Title is required.')
		.isString()
		.withMessage('unitStock required.')
		.custom((value) => {
			if (value < 0) {
				throw createError(400, 'Unit stock may not be negative.');
			}

			return false;
		}),

	body('reorderLevel')
		.not()
		.isEmpty()
		.withMessage('Title is required.')
		.isString()
		.withMessage('reorderLevel required.')
		.custom((value) => {
			if (value < 0) {
				throw createError(400, 'Unit stock may not be negative.');
			}

			return false;
		}),

	body('supplier')
		.not()
		.isEmpty()
		.withMessage('Supplier required.')
		.custom((value) => {
			if (mongoose.Types.ObjectId.isValid(value)) {
				throw createError(400, 'Supplier provided is not a valid ID');
			}

			return true;
		}),
];