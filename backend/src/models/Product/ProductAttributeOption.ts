import mongoose, {Schema, Types} from 'mongoose';

export interface IProductAttributeOption {
	readonly _id?: Types.ObjectId;
	name: string;
	attribute: Types.ObjectId;
}

const ProductAttributeOptionSchema = new mongoose.Schema<IProductAttributeOption>(
	{
		name: { type: String, required: true },
		attribute: {type: Schema.Types.ObjectId, ref: 'ProductAttribute', required: true},
	},
	{ timestamps: true }
);

const ProductAttributeOption = mongoose.model<IProductAttributeOption>('ProductAttributeOption', ProductAttributeOptionSchema);

export default ProductAttributeOption;
