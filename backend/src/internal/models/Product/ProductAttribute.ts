import mongoose from 'mongoose';
import { IProductAttributeOption } from './ProductAttributeOption.js';

export interface IProductAttribute {
	// Name (e.g. 'Colour', 'Material', 'Size')
	name: string;
	options: IProductAttributeOption[];
}

const ProductAttributeSchema = new mongoose.Schema<IProductAttribute>(
	{
		name: { type: String, required: true },
		options: [{ type: mongoose.Types.ObjectId, ref: 'ProductAttributeOption' }],
	},
	{ timestamps: true }
);

const ProductAttribute = mongoose.model<IProductAttribute>('ProductAttribute', ProductAttributeSchema);
export default ProductAttribute;
