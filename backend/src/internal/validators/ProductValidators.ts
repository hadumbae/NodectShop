import { body } from 'express-validator';
import mongoose, { Mongoose } from 'mongoose';
import ProductService from '../../services/ProductService.js';
import createError from 'http-errors';
import Supplier from '../models/Supplier.js';
import Category from '../models/Category.js';

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
		.withMessage('Unit Stock is required.')
		.isInt()
		.withMessage('Unit Stock must be an integer.')
		.custom((value) => {
			if (value < 0) {
				throw createError(400, 'Unit stock may not be negative.');
			}

			return true;
		}),

	body('reorderLevel')
		.not()
		.isEmpty()
		.withMessage('Reorder Level is required.')
		.isInt()
		.withMessage('Reorder Level must be an integer.')
		.custom((value) => {
			if (value < 0) {
				throw createError(400, 'Unit stock may not be negative.');
			}

			return true;
		}),

	body('isDiscontinued').optional().isBoolean().withMessage('Discontinued status must be a boolean.'),

	body('images').not().exists().withMessage('Please do not include image links.'),

	body('supplier')
		.not()
		.isEmpty()
		.withMessage('Supplier required.')
		.custom(async (value) => {
			const supplier = await Supplier.findById(value);

			if (!supplier) {
				throw createError(400, 'Supplier provided is not a valid ID');
			}

			return true;
		}),

	body('category')
		.optional()
		.custom(async (value) => {
			const category = await Category.findById(value);

			if (!category) {
				throw createError(400, 'Category provided is not a valid ID');
			}

			return true;
		}),
];
