import {Types, Schema, model} from 'mongoose';
import User from "./User.js";

export interface IProductRating {
	review: string;
	rating: number;
	user: Types.ObjectId;
	product: Types.ObjectId;
	sku: Types.ObjectId;
}

const ProductRatingSchema = new Schema<IProductRating>(
	{
		review: { type: String, required: false },
		rating: { type: Number, required: [true, 'Ratings Required.'], min: 1, max: 5 },
		user: { type: Schema.Types.ObjectId, ref: 'User', required: [true, 'User required.'] },
		product: { type: Schema.Types.ObjectId, ref: 'Product', required: [true, 'Product required.'] },
		sku: { type: Schema.Types.ObjectId, ref: 'ProductSKU', required: [true, 'Product SKU required.'] },
	},
	{ timestamps: true }
);

ProductRatingSchema.post('save', {document: true, query: false}, async function () {
	await User.findByIdAndUpdate(this.user, {$push: {ratings: this._id}});
});

ProductRatingSchema.post('deleteOne', {document: true, query: false}, async function () {
	console.log(this);
	await User.findByIdAndUpdate(this.user, {$pull: {ratings: this._id}});
});

const ProductRating = model<IProductRating>('ProductRating', ProductRatingSchema);

export default ProductRating;
