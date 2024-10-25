import mongoose from 'mongoose';

export interface ICartItem {
	quantity: number;
	userID: mongoose.Types.ObjectId;
	productID: mongoose.Types.ObjectId;
}

const CartItemSchema = new mongoose.Schema(
	{
		quantity: { type: Number, required: [true, 'Cart quantity required.'], min: [1, 'Quantity must be at least 1.'] },
		userID: { type: mongoose.Types.ObjectId, ref: 'User', required: [true, 'User required.'] },
		productID: { type: mongoose.Types.ObjectId, ref: 'Product', required: [true, 'Product required.'] },
	},
	{ timestamps: true }
);

const CartItem = mongoose.model<ICartItem>('CartItem', CartItemSchema);

export default CartItem;
