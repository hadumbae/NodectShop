import mongoose from 'mongoose';

export interface IUserOrderItem {
	productID?: mongoose.Types.ObjectId;
	title: string;
	description: string;
	unitPrice: number;
	image: string;
}

const UserOrderItemSchema = new mongoose.Schema(
	{
		productID: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: false },
		title: { type: String, required: [true, 'Product title required.'] },
		description: { type: String, required: [true, 'Product description required.'] },
		unitPrice: { type: Number, required: [true, 'Product price required.'] },
		image: { type: String, required: [true, 'Product image link required.'] },
	},
	{ timestamps: true }
);

const UserOrderItem = mongoose.model<IUserOrderItem>('UserOrderItem', UserOrderItemSchema);

export default UserOrderItem;
