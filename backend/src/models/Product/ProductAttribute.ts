import mongoose from 'mongoose';
import ProductAttributeOption, { IProductAttributeOption } from './ProductAttributeOption.js';
import ProductAttributeService from "../../services/Product/ProductAttributeService.js";

export interface IProductAttribute {
	// Name (e.g. 'Colour', 'Material', 'Size')
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

const deleteFunction = async (doc) => {
	await ProductAttributeService.deleteAttributeOptions(doc._id.toString());
};

ProductAttributeSchema.post("deleteOne", deleteFunction );
ProductAttributeSchema.post("deleteMany", deleteFunction );
ProductAttributeSchema.post("findOneAndDelete", deleteFunction );

const ProductAttribute = mongoose.model<IProductAttribute>('ProductAttribute', ProductAttributeSchema);
export default ProductAttribute;
