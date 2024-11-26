import createError from 'http-errors';

// Models
import User from '../../models/User/User.js';
import UserService from "./UserService.js";
import ProductSKUService from "../SKU/product.sku.admin.service.js";
import {Types} from "mongoose";
import ProductSKURepository from "../../repositories/ProductSKURepository.js";
import UserRepository from "../../repositories/UserRepository.js";

export default {
	/**
	 * Fetches the shopping cart of the provided user.
	 * @param userID The ID of the user to whom the cart belongs.
	 * @returns The cart of the user.
	 */
	async fetchUserCart(userID) {
		const user = await User.findById(userID);
		if (!user) throw createError(404, 'User not found.');
		return user.cart;
	},

	/**
	 * Clear the shopping cart of the provided user.
	 * @param userID The ID of the user to whom the cart belongs.
	 */
	async clearUserCart(userID): Promise<void> {
		const user = await User.findById(userID);
		if (!user) throw createError(404, 'User not found.');

		user.cart = [];
		await user.save();
	},

	/**
	 * Add an item to the specified shoppig cart.
	 * @param userID The ID of the cart's owner.
	 * @param skuID The SKU ID of the cart item to be added.
	 * @param quantity The quantity of the product to be added.
	 * @returns The updated user.
	 */
	async addToUserCart(userID: string, skuID: string, quantity: number): Promise<any> {
		try {
			const user = await UserRepository.existsOr404(userID);
			const sku = await ProductSKURepository.existsOr404(skuID);

			const itemIndex = user.cart.findIndex(i => i.sku.toString() == skuID);

			if (itemIndex < 0) {
				console.log('SKU: ', sku);
				user.cart.push({quantity: quantity, sku: sku._id});
			} else {
				user.cart[itemIndex].quantity += +quantity;
			}

			user.save();
			return user.populate('cart.sku');
		} catch (error) {
			throw createError(error.status, error.message);
		}
	},

	/**
	 * Remove an item from the specified shoppig cart.
	 * @param userID The ID of the cart's owner.
	 * @param skuID The SKU ID of the cart item to be remoed.
	 * @param quantity The quantity of the product to be removed.
	 * @returns The updated user.
	 */
	async removeFromUserCart(userID, skuID, quantity) {
		try {
			const sku = await ProductSKURepository.existsOr404(skuID);
			const user = await User.findOne({_id: userID, "cart.sku": skuID});
			if (!user) throw createError(404, 'Item not found.');

			const itemIndex = user.cart.findIndex(i => i.sku.toString() == skuID);

			console.log(quantity);

			if (user.cart[itemIndex].quantity <= +quantity) {
				user.cart.splice(itemIndex, 1);
			} else {
				user.cart[itemIndex].quantity -= +quantity;
			}

			await user.save();
			return user.populate('cart.sku');
		} catch (error) {
			throw createError(error.status, error.message);
		}
	},
};
