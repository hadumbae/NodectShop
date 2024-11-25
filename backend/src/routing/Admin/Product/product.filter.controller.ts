import asyncHandler from "../../../middleware/asyncHandler.js";
import {Request, Response} from "express";
import ProductPaginatedAdminService from "../../../services/Product/product.paginated.admin.service.js";
import ProductRepository from "../../../repositories/ProductRepository.js";

import ProductFilterService from "../../../services/Product/product.filter.service.js";

export const getFilteredProducts = asyncHandler(async (req: Request, res: Response) => {
    const { currentPage, perPage, conditions } = ProductPaginatedAdminService.processPaginationQuery(req.query);

    const totalItems = await ProductRepository.count(conditions);
    const products = await ProductPaginatedAdminService.fetchPaginatedProducts(currentPage, perPage, conditions);

    return res.status(200).json({ message: 'Paginated products fetched.', data: { products, totalItems } });
});

export const fetchAllProductTypesAndTags = asyncHandler(async (req: Request, res: Response) => {
    const data = await ProductFilterService.fetchAllTypesAndTags();
    return res.status(200).json({message: "Tags fetched.", data: data});
});