import mongoose, {Types} from 'mongoose';
import {IProductSKU} from "../Product/ProductSKU.js";
import {IProductRating} from "./ProductRating.js";
import {IUserOrder} from "./Order/UserOrder.js";

export interface ICartItem {
	quantity: number;
	sku: mongoose.Types.ObjectId;
}

export interface IUser {
	name: string;
	email: string;
	password: string;
	isAdmin: boolean;
	dob: string;
	gender: string;

	cart: (ICartItem|Types.ObjectId)[];
	orders: (IUserOrder|Types.ObjectId)[];
	favourites: (IProductSKU|Types.ObjectId)[];
	ratings: (IProductRating|Types.ObjectId)[];
}

const CartItemSchema = new mongoose.Schema<ICartItem>(
	{
		quantity: { type: Number, required: [true, 'Cart quantity required.'], min: [1, 'Quantity must be at least 1.'] },
		sku: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductSKU', required: [true, 'Product SKU required.'] },
	}
);

const UserSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true },
		password: { type: String, required: true },
		dob: {type: String, required: false, default: null },
		gender: { type: String, required: false, default: null },
		isAdmin: { type: Boolean, required: true, default: false },

		cart: {type: [CartItemSchema] },
		favourites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ProductSKU' }],
		ratings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ProductRating' }],
		orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserOrder' }],
	},
	{ timestamps: true }
);

const User = mongoose.model<IUser>('User', UserSchema);
export default User;
