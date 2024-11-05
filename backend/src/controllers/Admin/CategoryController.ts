import mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import createError, { isHttpError } from 'http-errors';

import CategoryService from '../../services/CategoryService.js';
import CategoryRepository from "../../repositories/CategoryRepository.js";

export const getCategories = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) return res.status(400).json({ message: 'Validation failed.', errors: errors.array() });

		const currentPage = req.query.page || 1;
		const perPage = req.query.perPage || 15;

		const totalItems = await CategoryRepository.count();
		const categories = await CategoryRepository.paginatedLean(currentPage, perPage);

		return res.json({ totalItems, data: categories });
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
		if (!mongoose.Types.ObjectId.isValid(categoryID)) return res.status(400).json({ message: 'Invalid ID.' });

		const {category, products, skus} = await CategoryService.fetchCategoryWithData(categoryID);
		return res.status(200).json({ data: {category, products, skus} });
	} catch (error) {
		if (!isHttpError(error)) res.status(500);
		next(error);
	}
};

export const getCategoryWithData = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const categoryID = req.params.id;
		if (!mongoose.Types.ObjectId.isValid(categoryID)) return res.status(400).json({ message: 'Invalid ID.' });

		const {category, products, skus} = await CategoryService.fetchCategoryWithData(categoryID);
		return res.status(200).json({ message: "Category Data Fetched.", data: {category, products, skus} });
	} catch (error) {
		if (!isHttpError(error)) res.status(500);
		next(error);
	}
};

export const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const categoryID = req.params.id;
		const data = req.body;

		const category = await CategoryService.update(categoryID, data);
		return res.status(200).json({ message: 'Category Updated.', data: category });
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

		await CategoryRepository.findByIdAndDelete(categoryID);
		res.status(200).json({ message: 'Category Deleted.' });
	} catch (error) {
		if (!isHttpError(error)) res.status(500);
		next(error);
	}
};

export const buildCategories = async (req: Request, res: Response, next: NextFunction) => {
	try {
		await CategoryService.build();
		res.status(200).json({ message: 'Categories Built.' });
	} catch (error) {
		if (!isHttpError(error)) res.status(500);
		next(error);
	}
};
