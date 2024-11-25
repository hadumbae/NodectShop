import {Request, Response, RequestHandler} from 'express';

import ProductAdminService from '../../../services/Product/product.admin.service.js';
import asyncHandler from "../../../middleware/asyncHandler.js";
import ProductRepository from "../../../repositories/ProductRepository.js";

export const createProduct = asyncHandler(async (req: Request, res: Response) => {
	const data = req.body;
	const product = await ProductAdminService.createProduct(data, req.file);

	return res.status(200).json({ message: "Product created.", data: product });
});

export const getProductByID: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
	const { productID } = req.params;
	const product = await ProductAdminService.fetchPopulatedProduct(productID);
	return res.status(200).json({ data: product });
});

export const updateProduct: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
	const { productID } = req.params;
	const data = req.body;

	const product = await ProductAdminService.updateProduct(productID, data, req.file);
	console.log("Product: ", product);
	res.status(200).json({ message: 'Product Updated.', data: product });
});

export const deleteProduct: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
	const { productID } = req.params;
	const deletedProduct = await ProductRepository.findByIdAndDelete(productID);
	res.status(200).json({ message: 'Product Deleted.', deletedProduct: deletedProduct });
});
