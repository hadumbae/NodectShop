import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema(
	{
		category: { type: String, required: true, unique: true },
		slug: { type: String, required: true, unique: true },
		products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: false }],
	},
	{ timestamps: true }
);

const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);
export default Category;
