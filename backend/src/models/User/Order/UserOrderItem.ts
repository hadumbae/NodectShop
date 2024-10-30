import mongoose, {Schema, Types} from 'mongoose';
import UserOrder from "./UserOrder.js";
import {IProduct} from "../Product/Product.js";
import {IProductSKU} from "../Product/ProductSKU.js";

export interface IUserOrderItem {
	order: Types.ObjectId;
	title: string;
	description: string;
	unitPrice: number;
	quantity: number;
	image?: string;
	skuNo: string;
	sku: Types.ObjectId | IProductSKU;
}

const UserOrderItemSchema = new mongoose.Schema<IUserOrderItem>(
	{
		order: {type: Schema.Types.ObjectId, ref: 'UserOrder', required: [true, 'Order required.'] },
		title: { type: String, required: [true, 'Product title required.'] },
		description: { type: String, required: [true, 'Product description required.'] },
		unitPrice: { type: Number, required: [true, 'Product price required.'] },
		quantity: { type: Number, required: [true, 'Quantity required.'] },
		image: { type: String, required: false, default: null },
		sku: {type: Schema.Types.ObjectId, ref: 'ProductSKU', required: [true, 'Product SKU required.'] },
	},
	{ timestamps: true }
);

UserOrderItemSchema.post('save', async function () {
	await UserOrder.findByIdAndUpdate({_id: this.order}, {$push: {items: this}});
})

const UserOrderItem = mongoose.model<IUserOrderItem>('UserOrderItem', UserOrderItemSchema);

export default UserOrderItem;
