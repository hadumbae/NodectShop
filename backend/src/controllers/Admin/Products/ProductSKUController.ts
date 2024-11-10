import {Request, Response, NextFunction} from "express";
import createError, {isHttpError} from "http-errors";
import {validationResult} from "express-validator";

import ProductSKUService from "../../../services/Product/ProductSKUService.js";
import asyncHandler from "../../../middleware/asyncHandler.js";
import ProductSKURepository from "../../../repositories/ProductSKURepository.js";

/**
 * Fetch product SKUs by product.
 * @param productID - The ID of the product.
 * @returns The product SKUs.
 */
export const getProductSKUs = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    const {productID} = req.params;
    const skus = await ProductSKUService.fetchMultiPopulatedSKULean({product: productID});
    return res.status(200).json({ data: skus });
})

/**
 * Fetch the paginated product SKUs by product.
 * @param productID - The ID of the product.
 * @param page - The current page of pagination.
 * @param perPage - The number of items per page.
 * @returns The paginated product SKUs.
 */
export const getPaginatedProductSKUs = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    const {productID} = req.params;

    const page = req.query.page || 1;
    const perPage = req.query.perPage || 10;

    const count = await ProductSKURepository.count({product: productID});
    const skus = await ProductSKUService.fetchPaginatedSKUs(page, perPage, {product: productID});
    return res.status(200).json({ message: "Product SKUs fetched successfully.", data: {skus, totalItems: count} });
})

/**
 * Fetch product SKU by ID.
 * @param skuID - The ID of the product SKU.
 * @returns The product SKU.
 */
export const fetchProductSKU = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const {skuID} = req.params;
    const sku = await ProductSKUService.fetchSinglePopulatedSKULean({_id: skuID});
    return res.status(200).json({ message: "Product SKU fetched successfully.", data: sku });
});

export const createProductSKU = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({message: "Validation failed.", errors: errors.array()});

        const {productID} = req.params;
        const data = req.body;
        const sku = await ProductSKUService.create(productID, data);
        return res.status(200).json({ message: "Product SKU created successfully.", data: sku });
    } catch (error) {
        if (!isHttpError(error)) res.status(500);
        next(error);
    }
}



export const updateProductSKU = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const {skuID} = req.params;
    const data = req.body;

    const sku = await ProductSKUService.update(skuID, data);

    return res.status(200).json({ message: "Product SKU updated successfully.", data: sku });
});

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const {skuID} = req.params;
            await ProductSKUService.delete(skuID);
            return res.status(200).json({ message: "Product SKU deleted successfully." });
        } catch (error) {
            if (!isHttpError(error)) res.status(500);
            next(error);
        }
    }


