import asyncHandler from '../../middleware/asyncHandler.js';
import { Request, Response } from 'express';
import ProductRepository from '../../repositories/ProductRepository.js';
import ProductAdminService from '../../services/Product/product.admin.service.js';

export const getProducts = asyncHandler(async (req: Request, res: Response) => {
	const { currentPage, perPage, conditions } = ProductAdminService.processPaginationQuery(req.query);

	const totalItems = await ProductRepository.count(conditions);
	const products = await ProductAdminService.fetchPaginatedProducts(currentPage, perPage, conditions);

	return res.status(200).json({ message: 'Paginated products fetched.', data: { products, totalItems } });
});
