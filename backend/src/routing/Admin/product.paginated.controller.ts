import asyncHandler from '../../middleware/asyncHandler.js';
import { Request, Response } from 'express';
import ProductRepository from '../../repositories/ProductRepository.js';
import ProductPaginatedAdminService from "../../services/Product/product.paginated.admin.service.js";

export const getPaginatedProducts = asyncHandler(async (req: Request, res: Response) => {
	const { currentPage, perPage, conditions } = ProductPaginatedAdminService.processPaginationQuery(req.query);

	const totalItems = await ProductRepository.count(conditions);
	const products = await ProductPaginatedAdminService.fetchPaginatedProducts(currentPage, perPage, conditions);

	return res.status(200).json({ message: 'Paginated products fetched.', data: { products, totalItems } });
});

