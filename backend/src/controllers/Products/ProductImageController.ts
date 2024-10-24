import { Request, Response, NextFunction } from 'express';
import { isHttpError } from 'http-errors';

import ProductImageService from '../../services/ProductImageService.js';

// * Main Images

export const uploadMainImage = async (req: Request, res: Response, next: NextFunction) => {
	const { productID } = req.params;

	try {
		const product = await ProductImageService.uploadMainImage(productID, req.file);
		return res.status(200).json({ message: 'Product Image Uploaded.', data: product });
	} catch (error) {
		if (!isHttpError(error)) res.status(500);
		next(error);
	}
};

export const deleteMainImage = async (req: Request, res: Response, next: NextFunction) => {
	const { productID } = req.params;

	try {
		const product = await ProductImageService.removeMainImage(productID);
		return res.status(200).json({ message: 'Product Image Removed.', data: product });
	} catch (error) {
		if (!isHttpError(error)) res.status(500);
		next(error);
	}
};

// * Sub Images

export const uploadSubImages = async (req: Request, res: Response, next: NextFunction) => {
	const { productID } = req.params;

	try {
		const product = await ProductImageService.uploadSubImages(productID, req.files);
		return res.status(200).json({ message: 'Product Images Uploaded.', data: product });
	} catch (error) {
		console.log('Sub Error: ', error);
		if (!isHttpError(error)) res.status(500);
		next(error);
	}
};

export const deleteSubImage = async (req: Request, res: Response, next: NextFunction) => {
	const { productID, subID } = req.params;

	try {
		const product = await ProductImageService.removeSubImage(productID, subID);
		return res.status(200).json({ message: 'Product Image Removed.', data: product });
	} catch (error) {
		console.log('Sub Error: ', error);
		if (!isHttpError(error)) res.status(500);
		next(error);
	}
};
