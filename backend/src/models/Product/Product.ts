import mongoose, {Schema, Types} from 'mongoose';

import ProductSKU, {IProductSKU} from "./ProductSKU.js";
import Category from "../Category.js";

export interface IProductImage {
	secure_url: string;
	public_id: string;
}

export interface IProduct {
	readonly _id: Types.ObjectId;
	title: string;
	type?: string;
	description: string;
	image: IProductImage
	category?: Types.ObjectId;
	skus: IProductSKU[];
	tags: string[]
}

const ProductImageSchema = new Schema<IProductImage>({
	secure_url: {type: String, required: true},
	public_id: {type: String, required: true},
},{timestamps: true, id: false, _id: false});

const ProductSchema = new mongoose.Schema<IProduct>(
	{
		title: { type: String, required: true },
		type: { type: String, required: false, default: null },
		description: { type: String, required: true },
		image: {type: ProductImageSchema, required: true},
		category: { type: Schema.Types.ObjectId, ref: 'Category', required: false },
		skus: [{type: Schema.Types.ObjectId, ref: 'ProductSKU', required: false, default: []}],
		tags: [{ type: String, required: false }],
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
