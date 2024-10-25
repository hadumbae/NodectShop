import mongoose, { mongo } from 'mongoose';
import { ProductImageType } from '../types/ProductTypes.js';

export interface IProduct {
	title: string;
	slug: string;
	barcodeNumber: string;
	description: string;
	unitPrice: Number;
	unitStock: Number;
	reorderLevel: Number;
	isDiscontinued: boolean;
	images: {
		mainImage: ProductImageType;
		subImages: ProductImageType[];
	};

	supplier: mongoose.Types.ObjectId;
	category?: mongoose.Types.ObjectId;
}

const ProductSchema = new mongoose.Schema<IProduct>(
	{
		title: { type: String, required: true },
		slug: { type: String, required: true },
		barcodeNumber: { type: String, required: true, unique: true },
		description: { type: String, required: true },
		unitPrice: { type: Number, required: true },
		unitStock: { type: Number, required: true },
		reorderLevel: { type: Number, required: true },
		isDiscontinued: { type: Boolean, default: false },
		images: {
			mainImage: {
				secure_url: { type: String, required: true },
				public_id: { type: String, required: true },
			},
			subImages: [
				{
					secure_url: { type: String, required: true },
					public_id: { type: String, required: true },
				},
			],
		},
		supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier', required: true },
		category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: false },
	},
	{ timestamps: true }
);

const Product = mongoose.model<IProduct>('Product', ProductSchema);
export default Product;
