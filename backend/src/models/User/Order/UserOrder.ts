import mongoose, {Schema} from 'mongoose';
import { IUserOrderItem } from './UserOrderItem.js';

export interface IUserOrderAddressDetails {
	readonly _id?: string;
	firstName?: string;
	lastName?: string;
	phoneNumber?: string;
	email?: string;
	country?: string;
	state?: string;
	street?: string;
	streetAdditional?: string;
}

export interface IUserOrder {
	user: mongoose.Types.ObjectId;
	orderNo: string;
	orderDate: string;
	orderStatus: string;
	orderNotes?: string;

	items?: IUserOrderItem[];
	totalPrice: number;
	totalQuantity: number;
	shippingCharge: number;

	billingAddress: IUserOrderAddressDetails,
	shippingAddress?: IUserOrderAddressDetails,
	shipToBillingAddress: boolean;
}

const UserOrderAddressDetailsSchema = new Schema<IUserOrderAddressDetails>(
	{
		firstName: {type: String, required: [true, "firstName is required."]},
		lastName: {type: String, required: [true, "lastName is required."]},
		phoneNumber: {type: String, required: [true, "phoneNumber is required."]},
		email: {type: String, required: [true, "email is required."]},
		country: {type: String, required: [true, "country is required."]},
		state: {type: String, required: [true, "state is required."]},
		street: {type: String, required: [true, "street is required."]},
		streetAdditional: {type: String, required: false, default: null},
	}, {timestamps: false}
)

const UserOrderSchema = new mongoose.Schema<IUserOrder>(
	{
		user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: [true, 'User required.'] },

		orderNo: { type: String, required: [true, 'Order Number required.'], unique: true },
		orderDate: { type: String, required: [true, 'Order Date required.'] },
		orderNotes: { type: String, required: false, default: null },
		orderStatus: { type: String, required: [true, 'Order Status required.'], default: 'Pending' },

		items: { type: [{type: Schema.Types.ObjectId, ref: 'UserOrderItem'}], default: [] },
		totalPrice: { type: Number, required: [true, 'Total price is required.'] },
		totalQuantity: { type: Number, required: [true, 'Total quantity is required.'] },
		shippingCharge: {type: Number, required: false, default: 0},

		billingAddress: {type: UserOrderAddressDetailsSchema, required: [true, 'Billing address is required.'] },
		shippingAddress: {type: UserOrderAddressDetailsSchema, required: false, default: null },
		shipToBillingAddress: {type: Boolean, default: true, required: [true, 'Please verify that you will ship to the billing address.'] },
	},
	{ timestamps: true }
);

const UserOrder = mongoose.model<IUserOrder>('UserOrder', UserOrderSchema);

export default UserOrder;
