import mongoose from 'mongoose';

import { ICartItem } from './CartItem.js';

export interface IUser {
	name: string;
	email: string;
	password: string;
	isAdmin: boolean;

	cart: ICartItem[];
	orders: [];
	favourites: [];
	ratings: [];
}

const UserSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true },
		password: { type: String, required: true },
		isAdmin: { type: Boolean, required: true, default: false },

		cart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CartItem' }],
		favourites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
		ratings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ProductRating' }],
		orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserOrder' }],
	},
	{ timestamps: true }
);

const User = mongoose.model<IUser>('User', UserSchema);
export default User;
