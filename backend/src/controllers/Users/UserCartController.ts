import { Request, Response, NextFunction } from 'express';

import mongoose from 'mongoose';
import createError, { isHttpError } from 'http-errors';

import UserCartService from '../../services/User/UserCartService.js';
import { validationResult } from 'express-validator';

export default {
	async fetchUserCart(req: Request, res: Response, next: NextFunction) {
		try {
			const userID = req.params.userID;
			if (!userID) throw createError(400, 'User ID required.');

			const cart = await UserCartService.fetchUserCart(userID);
			return res.status(200).json({ message: 'Cart retrieved successfully.', cart });
		} catch (error) {
			if (!isHttpError(error)) {
				error = createError(error.status, error.message);
			}

			next(error);
		}
	},

	async clearUserCart(req: Request, res: Response, next: NextFunction) {
		try {
			const userID = req.params.userID;
			if (!userID) throw createError(400, 'User ID required.');

			await UserCartService.clearUserCart(userID);
			return res.status(200).json({ message: 'Cart cleared successfully.' });
		} catch (error) {
			if (!isHttpError(error)) {
				error = createError(error.status, error.message);
			}

			next(error);
		}
	},

	async addToUserCart(req: Request, res: Response, next: NextFunction) {
		try {
			const userID = req.params.userID;
			if (!userID) throw createError(400, 'User ID required.');

			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({ message: 'Validation failed.', errors: errors.array() });
			}

			const { productID, quantity } = req.body;
			const cartItem = await UserCartService.addToUserCart(userID, productID, quantity);
			return res.status(200).json({ message: 'Added to cart successfully.', cartItem: cartItem });
		} catch (error) {
			if (!isHttpError(error)) res.status(500);
			next(error);
		}
	},

	async removeFromUserCart(req: Request, res: Response, next: NextFunction) {
		try {
			const userID = req.params.userID;
			if (!userID) throw createError(400, 'User ID required.');

			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({ message: 'Validation failed.', errors: errors.array() });
			}

			const { productID, quantity } = req.body;
			const cartItem = await UserCartService.removeFromUserCart(userID, productID, quantity);
			return res.status(200).json({ message: 'Removed from cart successfully.', cartItem: cartItem });
		} catch (error) {
			if (!isHttpError(error)) {
				error = createError(error.status, error.message);
			}

			next(error);
		}
	},
};
