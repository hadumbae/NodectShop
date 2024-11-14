import { Request, Response, NextFunction } from 'express';
import { isHttpError } from 'http-errors';

import ProductSKUImageAdminService from '../../../services/SKU/product.sku.image.admin.service.js';
import {validationResult} from "express-validator";

export default {
	async uploadSKUImages(req: Request, res: Response, next: NextFunction): Promise<Response> {
		try{
			const errors = validationResult(req);
			if (!errors.isEmpty()) return res.status(400).json({message: "Validation failed.", errors: errors.array()});

			const {skuID} = req.body;
			const images = req.files;
			const sku = await ProductSKUImageAdminService.createProductSKUImages(skuID, images);

			return res.status(200).json({ message: "Product SKU images uploaded successfully.", data: sku });
		} catch (error) {
			if (!isHttpError(error)) res.status(500);
			next(error);
		}
	},

	async deleteSKUImages(req: Request, res: Response, next: NextFunction): Promise<Response> {
		try{
			const sku = await ProductSKUImageAdminService.deleteProductSKUImage(req.params.imageID);
			return res.status(200).json({ message: "Product SKU image deleted successfully.", data: sku });
		} catch (error) {
			if (!isHttpError(error)) res.status(500);
			next(error);
		}
	},

	async markAsPrimary(req: Request, res: Response, next: NextFunction): Promise<Response> {
		try{
			const sku = await ProductSKUImageAdminService.markAsPrimary(req.params.imageID);
			return res.status(200).json({ message: "Product SKU image marked as primary.", data: sku });
		} catch (error) {
			if (!isHttpError(error)) res.status(500);
			next(error);
		}
	}
}


