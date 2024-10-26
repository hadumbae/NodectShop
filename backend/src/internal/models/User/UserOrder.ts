import mongoose from 'mongoose';
import { IUserOrderItem } from './UserOrderItem.js';

export interface IUserOrder {
	userID: mongoose.Types.ObjectId;
	orderNo: string;
	orderDate: string;
	orderStatus: string;
	items: [{ quantity: number; product: IUserOrderItem }];
}

const UserOrderSchema = new mongoose.Schema(
	{
		userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: [true, 'User required.'] },
		orderNo: { type: String, required: [true, 'Order Number required.'] },
		orderDate: { type: String, required: [true, 'Order Date required.'] },
		orderStatus: { type: String, required: [true, 'Order Status required.'], default: 'Pending' },
		items: { type: [mongoose.Types.ObjectId], ref: 'UserOrderItem' },
	},
	{ timestamps: true }
);

const UserOrder = mongoose.model<IUserOrder>('UserOrder', UserOrderSchema);

export default UserOrder;
