import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		slug: { type: String, required: true },
		description: { type: String, required: true },
		unitPrice: { type: Number, required: true },
		unitStock: { type: Number, required: true },
		reorderLevel: { type: Number, required: true },
		isDiscontinued: { type: Boolean, default: false },
		images: {
			mainImage: { type: String, required: false, default: null },
			subImages: [{ type: String, required: false }],
		},
		supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier', required: true },
		category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: false },
	},
	{ timestamps: true }
);

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
export default Product;
