import mongoose from 'mongoose';
import ProductAttributeOption, { IProductAttributeOption } from './ProductAttributeOption.js';

export interface IProductAttribute {
	name: string;
	options: IProductAttributeOption[];
}

const ProductAttributeSchema = new mongoose.Schema<IProductAttribute>(
	{
		name: { type: String, required: true, unique: true },
		options: [{ type: mongoose.Types.ObjectId, ref: 'ProductAttributeOption' }],
	},
	{ timestamps: true }
);

// Middleware

ProductAttributeSchema.post("deleteOne", {document: true, query: false}, async function () {
	this.options.forEach(async (option) => {await ProductAttributeOption.deleteOne(option);})
} );

const ProductAttribute = mongoose.model<IProductAttribute>('ProductAttribute', ProductAttributeSchema);
export default ProductAttribute;
