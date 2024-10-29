import mongoose, {Schema, Types} from 'mongoose';
import ProductAttribute from "./ProductAttribute.js";
import ProductSKU from "./ProductSKU.js";

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

// Middleware

ProductAttributeOptionSchema.post('save', {document: true, query: false}, async function(next) {
	await ProductAttribute.updateOne({_id: this.attribute}, {$push: {options: this._id}});
});

ProductAttributeOptionSchema.post('deleteOne', {document: true, query: false}, async function(next) {
	await ProductAttribute.updateOne({_id: this.attribute}, {$pull: {options: this._id}});
	await ProductSKU.updateMany({}, {$pull: {options: this._id}});
});

const ProductAttributeOption = mongoose.model<IProductAttributeOption>('ProductAttributeOption', ProductAttributeOptionSchema);

export default ProductAttributeOption;
