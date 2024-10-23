import mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import createError, { isHttpError } from 'http-errors';

import CategoryService from '../services/CategoryService.js';

export const getCategories = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const categories = await CategoryService.find();
		return res.status(200).json({ data: categories });
	} catch (error) {
		if (!isHttpError(error)) res.status(500);
		next(error);
	}
};

export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({ message: 'Validation failed.', errors: errors.array() });
	}

	try {
		const data = req.body;
		const category = await CategoryService.create(data);

		return res.status(200).json({ data: category });
	} catch (error) {
		console.log('Error: ', error.message);

		if (!isHttpError(error)) res.status(500);
		next(error);
	}
};

export const getCategoryByID = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const categoryID = req.params.id;
		if (!mongoose.Types.ObjectId.isValid(categoryID)) {
			return res.status(400).json({ message: 'Invalid ID.' });
		}

		const category = await CategoryService.findByIDOr404({ _id: categoryID });
		return res.status(200).json({ data: category });
	} catch (error) {
		if (!isHttpError(error)) res.status(500);
		next(error);
	}
};

export const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const categoryID = req.params.id;
		const data = req.body;

		if (!mongoose.Types.ObjectId.isValid(categoryID)) {
			return res.status(400).json({ message: 'Invalid ID.' });
		}

		await CategoryService.update(categoryID, data);
		res.status(200).json({ message: 'Category Updated.' });
	} catch (error) {
		if (!isHttpError(error)) res.status(500);
		next(error);
	}
};

export const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const categoryID = req.params.id;

		if (!mongoose.Types.ObjectId.isValid(categoryID)) {
			return res.status(400).json({ message: 'Invalid ID.' });
		}

		await CategoryService.destroy(categoryID);
		res.status(200).json({ message: 'Category Deleted.' });
	} catch (error) {
		if (!isHttpError(error)) res.status(500);
		next(error);
	}
};
