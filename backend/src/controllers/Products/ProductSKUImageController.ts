import { Request, Response, NextFunction } from 'express';
import { isHttpError } from 'http-errors';

import ProductSKUImageService from '../../services/Product/ProductSKUImageService.js';
import {validationResult} from "express-validator";

export default {
	async uploadSKUImages(req: Request, res: Response, next: NextFunction): Promise<Response> {
		try{
			const errors = validationResult(req);
			if (!errors.isEmpty()) return res.status(400).json({message: "Validation failed.", errors: errors.array()});

			const {skuID} = req.params;
			const images = req.files;
			const sku = await ProductSKUImageService.createProductSKUImage(skuID, images);

			return res.status(200).json({ message: "Product SKU created successfully.", data: sku });
		} catch (error) {
			if (!isHttpError(error)) res.status(500);
			next(error);
		}
	},

	async deleteSKUImages(req: Request, res: Response, next: NextFunction): Promise<Response> {
		try{
			const {imageID} = req.params;
			await ProductSKUImageService.deleteProductSKUImage(imageID);

			return res.status(200).json({ message: "Product SKU image deleted successfully." });
		} catch (error) {
			if (!isHttpError(error)) res.status(500);
			next(error);
		}
	},

	async markAsPrimary(req: Request, res: Response, next: NextFunction): Promise<Response> {
		try{
			const {imageID} = req.params;
			const image = await ProductSKUImageService.markAsPrimary(imageID);

			return res.status(200).json({ message: "Product SKU image marked as primary.", data: image });
		} catch (error) {
			if (!isHttpError(error)) res.status(500);
			next(error);
		}
	}
}


