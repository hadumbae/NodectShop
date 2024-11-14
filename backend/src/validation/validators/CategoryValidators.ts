import { body } from 'express-validator';
import getCategoryPaginatedValidator from "./Category/GetCategoryPaginatedValidator.js";
import CategoryRepository from "../../repositories/CategoryRepository.js";

getCategoryPaginatedValidator

export const addCategoryValidator = [
	body('category')
		.exists().withMessage('Category name must not be empty')
		.isLength({ min: 3 }).withMessage('Must be at least 3 characters long.')
		.custom(async (value, { req }) => {
			const checkCount = await CategoryRepository.count({ category: value });
			if (checkCount > 0) return Promise.reject('Name must be unique. Category with name already exists.');
		}),
];

export const updateCategoryValidator = [
	body('category')
		.exists().withMessage('Category name must not be empty')
		.isLength({ min: 3 }).withMessage('Must be at least 3 characters long.')
		.custom(async (value, { req }) => {
			console.log(req.params.categoryID)

			const checkCount = await CategoryRepository.count({ _id: {$ne: req.params.categoryID}, category: value });
			if (checkCount > 0) return Promise.reject('Name must be unique. Category with name already exists.');
		}),
];
