import mongoose from 'mongoose';

export interface IProductRating {
	review: string;
	rating: number;
	userID: mongoose.Types.ObjectId;
	productID: mongoose.Types.ObjectId;
}

const ProductRatingSchema = new mongoose.Schema(
	{
		review: { type: String, required: false },
		rating: { type: Number, required: [true, 'Ratings Required.'], min: 0, max: 5 },
		userID: { type: mongoose.Types.ObjectId, ref: 'User', required: [true, 'User required.'] },
		productID: { type: mongoose.Types.ObjectId, ref: 'Product', required: [true, 'Product required.'] },
	},
	{ timestamps: true }
);

const ProductRating = mongoose.model<IProductRating>('ProductRating', ProductRatingSchema);

export default ProductRating;
