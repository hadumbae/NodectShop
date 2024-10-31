import { Request, Response, NextFunction } from 'express';

import mongoose from 'mongoose';
import createError, { isHttpError } from 'http-errors';

import UserCartService from '../../../services/User/UserCartService.js';
import { validationResult } from 'express-validator';
import UserOrderService from "../../../services/User/Order/UserOrderService.js";
import UserCheckoutService from "../../../services/User/UserCheckoutService.js";

export default {
	async fetchUserCart(req: Request, res: Response, next: NextFunction) {
		try {
			const userID = req.userID;
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
			const userID = req.userID;
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
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({ message: 'Validation failed.', errors: errors.array() });
			}

			const userID = req.userID;
			const { skuID, quantity } = req.body;

			const { cart } = await UserCartService.addToUserCart(userID, skuID, quantity);
			return res.json({ message: 'Added to cart successfully.', userID: userID, cart: cart });
		} catch (error) {
			if (!isHttpError(error)) res.status(500);
			next(error);
		}
	},

	async removeFromUserCart(req: Request, res: Response, next: NextFunction) {
		try {

			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({ message: 'Validation failed.', errors: errors.array() });
			}

			const userID = req.params.userID;
			const { skuID, quantity } = req.body;
			const { cart } = await UserCartService.removeFromUserCart(userID, skuID, quantity);
			return res.status(200).json({ message: 'Removed from cart successfully.', userID: userID, cart: cart });
		} catch (error) {
			if (!isHttpError(error)) {
				error = createError(error.status, error.message);
			}

			next(error);
		}
	},

	async checkout(req: Request, res: Response, next: NextFunction) {
		try {

			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({ message: 'Validation failed.', errors: errors.array() });
			}

			const user = await UserCheckoutService.checkout(req.userID, req.body);
			return res.status(200).json({ message: 'User fetched.', userID: req.userID, user: user });
		} catch (error) {
			if (!isHttpError(error)) {
				error = createError(error.status, error.message);
			}

			next(error);
		}
	}
};
