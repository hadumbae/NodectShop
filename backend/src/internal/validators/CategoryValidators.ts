import { body } from 'express-validator';
import CategoryService from '../../services/CategoryService.js';
import createError from 'http-errors';

export const addCategoryValidator = [
	body('category')
		.not()
		.isEmpty()
		.withMessage('Category name must not be empty')
		.isLength({ min: 3 })
		.withMessage('Must be at least 3 characters long.')
		.custom(async (value, { req }) => {
			const checkCount = await CategoryService.countCategories({ category: value });

			if (checkCount > 0) {
				return Promise.reject('Name must be unique. Category with name already exists.');
			}
		}),
];
