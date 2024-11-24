import mongoose, {Schema, Types} from 'mongoose';
import ProductSKU, {IProductSKU} from "./ProductSKU.js";

export interface IProductImage {
	secure_url: string;
	public_id: string;
}

export interface IProduct {
	readonly _id: Types.ObjectId;
	title: string;
	description: string;
	image: IProductImage
	skus: IProductSKU[];
	types: string[];
	tags: string[]
}

const ProductImageSchema = new Schema<IProductImage>({
	secure_url: {type: String, required: true},
	public_id: {type: String, required: true},
},{timestamps: true, id: false, _id: false});

const ProductSchema = new mongoose.Schema<IProduct>(
	{
		title: { type: String, required: true },
		description: { type: String, required: true },
		image: {type: ProductImageSchema, required: true},
		skus: [{type: Schema.Types.ObjectId, ref: 'ProductSKU', required: false}],
		types: [{ type: String, required: false }],
		tags: [{ type: String, required: false }],
	},
	{ timestamps: true }
);

ProductSchema.pre('deleteOne', {document: true, query: false}, async function(next) {
	const skus = await ProductSKU.where({product: this._id});
	skus.forEach(async (sku) => await sku.deleteOne());
});

const Product = mongoose.model<IProduct>('Product', ProductSchema);
export default Product;
