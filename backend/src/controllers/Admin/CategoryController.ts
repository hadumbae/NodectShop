import mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express';

import CategoryService from '../../services/CategoryService.js';
import CategoryRepository from "../../repositories/CategoryRepository.js";
import asyncHandler from "../../middleware/asyncHandler.js";

export const getCategories = async (req: Request, res: Response) => {
		const categories = await CategoryRepository.findLean();
		return res.json({ message: "Categories fetched successfully.", data: categories });

};

export const getPaginatedCategories = asyncHandler(async (req: Request, res: Response) => {
	const currentPage = req.query.page || 1;
	const perPage = req.query.perPage || 15;

	const totalItems = await CategoryRepository.count();
	const categories = await CategoryRepository.paginatedLean(currentPage, perPage);

	return res.json({ data: {categories, totalItems} });
});

export const createCategory = asyncHandler(async (req: Request, res: Response) => {
	const data = req.body;
	const category = await CategoryService.create(data);

	return res.status(200).json({ data: category });
});

export const getCategoryByID = asyncHandler(async (req: Request, res: Response) => {
	const categoryID = req.params.id;
	if (!mongoose.Types.ObjectId.isValid(categoryID)) return res.status(400).json({ message: 'Invalid ID.' });

	const {category, products, skus} = await CategoryService.fetchCategoryWithData(categoryID);
	return res.status(200).json({ data: {category, products, skus} });
});

export const updateCategory = asyncHandler(async (req: Request, res: Response) => {
	const categoryID = req.params.id;
	const data = req.body;

	const category = await CategoryService.update(categoryID, data);
	return res.status(200).json({ message: 'Category Updated.', data: category });
});

export const deleteCategory = asyncHandler(async (req: Request, res: Response) => {
	const categoryID = req.params.id;
	await CategoryRepository.findByIdAndDelete(categoryID);
	res.status(200).json({ message: 'Category Deleted.' });
});
