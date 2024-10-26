import createError from 'http-errors';

// Models
import User from '../../internal/models/User/User.js';
import CartItem from '../../internal/models/User/CartItem.js';

import { ICartItem } from '../../internal/models/User/CartItem.js';
import Product from '../../internal/models/Product.js';

export default {
	/**
	 * Fetches the shopping cart of the provided user.
	 * @param userID The ID of the user to whom the cart belongs.
	 * @returns The cart of the user.
	 */
	async fetchUserCart(userID): Promise<ICartItem[]> {
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
	 * @param productID The ID of the product to be added.
	 * @param quantity The quantity of the product to be added.
	 * @returns The updated shopping cart and the cart item.
	 */
	async addToUserCart(userID: string, productID: string, quantity: number): Promise<any> {
		const user = await User.findById(userID).populate('cart');
		if (!user) throw createError(404, 'User not found.');

		const product = await Product.findById(productID);
		if (!product) throw createError(404, 'Product not found.');

		const itemIndex = user.cart.findIndex((i) => i.productID.toString() == productID);
		let cartItem;

		if (itemIndex >= 0) {
			cartItem = user.cart[itemIndex];
			cartItem.quantity += +quantity;
			cartItem.save();
		} else {
			cartItem = new CartItem({ quantity: quantity, userID: user._id, productID: product._id });
			cartItem.save();
		}

		return cartItem;
	},

	/**
	 * Remove an item from the specified shoppig cart.
	 * @param userID The ID of the cart's owner.
	 * @param productID The ID of the product to be remoed.
	 * @param quantity The quantity of the product to be removed.
	 * @returns The updated shopping cart.
	 */
	async removeFromUserCart(userID, productID, quantity) {
		const cartItem = await CartItem.findOne({ userID, productID });
		if (!cartItem) throw createError('Cart Item Not Found.');

		if (cartItem.quantity <= quantity) {
			await CartItem.deleteOne({ _id: cartItem._id });
			return null;
		} else {
			cartItem.quantity -= +quantity;
			cartItem.save();

			return cartItem;
		}
	},
};
