import mongoose, {Schema, Types} from 'mongoose';

import ProductSKU, {IProductSKU} from "./ProductSKU.js";
import Category from "../Category.js";

export interface IProduct {
	readonly _id: Types.ObjectId;
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

ProductSchema.pre('save', {document: true, query: false}, function (next) {
	console.log(this);
	next();
})

ProductSchema.post('save', {document: true, query: false}, async function () {
	const category = await Category.findOne({products: this._id});

	if (!category || category._id.toString() != this.category.toString()) {
		if (category) {
			category.products = category.products.filter(p => p._id.toString() !== this._id.toString());
			category.save();
		}

		await Category.findByIdAndUpdate(this.category, {$push: {products: this}});
	}
});

ProductSchema.pre('deleteOne', {document: true, query: false}, async function(next) {
	const skus = await ProductSKU.where({product: this._id});
	skus.forEach(async (sku) => await sku.deleteOne());
});

const Product = mongoose.model<IProduct>('Product', ProductSchema);
export default Product;
