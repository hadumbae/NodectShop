import {Request, RequestHandler, Response} from 'express';
import asyncHandler from "../../../middleware/asyncHandler.js";

import CategoryRepository from "../../../repositories/CategoryRepository.js";
import CategoryAdminService from "../../../services/Category/category.admin.service.js";

/**
 * Find all categories.
 */
export const getCategories: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
	const categories = await CategoryRepository.findLean();
	return res.json({message: "Categories fetched successfully.", data: categories});
});

/**
 * Fetch paginated categories.
 */
export const getPaginatedCategories: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
	const currentPage = req.query.page || 1;
	const perPage = req.query.perPage || 15;

	const totalItems = await CategoryRepository.count();
	const categories = await CategoryRepository.paginatedLean(currentPage, perPage);

	return res.json({ message: "Categories fetched.", data: {categories, totalItems} });
});

/**
 * Create a category.
 */
export const createCategory: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
	const data = req.body;
	const category = await CategoryRepository.create(data);
	return res.status(200).json({ data: category });
});

/**
 * Find a category by its ID.
 */
export const getCategoryByID = asyncHandler(async (req: Request, res: Response) => {
	const { categoryID } = req.params;
	const category = await CategoryRepository.findById(categoryID);
	return res.status(200).json({ data: category });
});

/**
 * Update a category.
 */
export const updateCategory = asyncHandler(async (req: Request, res: Response) => {
	const { categoryID } = req.params;
	const data = req.body;

	const category = await CategoryRepository.findByIdAndUpdate(categoryID, data);
	return res.status(200).json({ message: 'Category Updated.', data: category });
});

/**
 * Delete a category
 */
export const deleteCategory = asyncHandler(async (req: Request, res: Response) => {
	const { categoryID } = req.params;
	await CategoryRepository.findByIdAndDelete(categoryID);
	return res.status(200).json({ message: 'Category Deleted.' });
});

/**
 * Fetch
 */
export const getCategoryData = asyncHandler(async (req: Request, res: Response) => {
	const { categoryID } = req.params;
	const {category, products} = await CategoryAdminService.fetchCategoryWithData(categoryID);
	return res.status(200).json({ message: "Category Data Retrieved.", data: {category, products} });
});