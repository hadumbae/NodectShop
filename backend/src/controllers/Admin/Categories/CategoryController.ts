import {Request, RequestHandler, Response} from 'express';
import asyncHandler from "../../../middleware/asyncHandler.js";

import CategoryRepository from "../../../repositories/CategoryRepository.js";
import CategoryAdminService from "../../../services/Category/category.admin.service.js";
import ProductPaginatedAdminService from "../../../services/Product/product.paginated.admin.service.js";
import PaginationService from "../../../services/pagination.service.js";
import CategoryProductsAdminService from "../../../services/Category/category.products.admin.service.js";

/**
 * Find all categories.
 */
export const getCategories: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
	const categories = await CategoryRepository.findLean();
	return res.json({message: "Categories fetched successfully.", data: categories});
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
	const category = await CategoryRepository.existsOr404Lean(categoryID);
	return res.status(200).json({ message: "Category retrieved.", data: category });
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
 * Fetch paginated categories.
 */
export const getPaginatedCategories: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
	const {page, perPage} = PaginationService.fetchPaginationQuery(req.query);

	const totalItems = await CategoryRepository.count();
	const categories = await CategoryProductsAdminService.paginateCategoriesWithProductCount(page, perPage);

	return res.json({ message: "Categories fetched.", data: {categories, totalItems} });
});


export const getPaginatedProductsByCategory = asyncHandler(async (req: Request, res: Response) => {
	const {page, perPage} = PaginationService.fetchPaginationQuery(req.query);
	const { categoryID } = req.params;

	const {totalItems, products} = await CategoryProductsAdminService.fetchPaginatedProductsByCategory(categoryID as string, page, perPage);
	return res.status(200).json({message: "Paginated products by category fetched.", data: {totalItems, products}});
});

