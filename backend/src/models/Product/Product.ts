import mongoose, {Schema, Types} from 'mongoose';

import ProductSKU, {IProductSKU} from "./ProductSKU.js";
import ProductSKUService from "../../services/Product/ProductSKUService.js";

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
		skus: [{type: Schema.Types.ObjectId, ref: 'ProductSKU', required: false, default: []}],
	},
	{ timestamps: true }
);

ProductSchema.pre('deleteOne', {document: true, query: false}, async function(next) {
	const skus = await ProductSKU.where({product: this._id});
	skus.forEach(async (sku) => await sku.deleteOne());
});

const Product = mongoose.model<IProduct>('Product', ProductSchema);
export default Product;
