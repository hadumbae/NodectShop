import mongoose, {Schema, Types} from 'mongoose';

import {IProductSKU} from "./ProductSKU.js";

export interface IProduct {
	title: string;
	slug: string;
	description: string;
	category?: Types.ObjectId;
	skus: IProductSKU[];
}

const ProductSchema = new mongoose.Schema<IProduct>(
	{
		title: { type: String, required: true },
		slug: { type: String, required: true },
		description: { type: String, required: true },
		category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
		skus: [{type: Schema.Types.ObjectId, ref: 'ProductSKU'}],
	},
	{ timestamps: true }
);

const Product = mongoose.model<IProduct>('Product', ProductSchema);
export default Product;
