import mongoose, {Schema, Types} from 'mongoose';
import {IProductAttributeOption} from "./ProductAttributeOption.js";
import {IProductSKUImage} from "./ProductSKUImage.js";

export interface IProductSKU {
    readonly id?: string;
    product: Types.ObjectId;
    supplier: Types.ObjectId;
    code: string;
    unitPrice: number;
    unitStock: number;
    reorderLevel: number;
    isDiscontinued: boolean;
    images?: IProductSKUImage[];
    options?: IProductAttributeOption[];
}

const ProductSKUSchema = new Schema<IProductSKU>({
    product: {type: Schema.Types.ObjectId, ref: 'Product'},
    supplier: {type: Schema.Types.ObjectId, ref: 'Supplier'},

    code: {type: String, required: true},
    unitPrice: {type: Number, required: [true, "Unit Price required."]},
    unitStock: {type: Number, required: [true, "Unit Stock required."]},
    reorderLevel: {type: Number, required: [true, "Reorder Level required."]},
    isDiscontinued: {type: Boolean, default: false, required: [true, "Discontinued Status required."]},

    images: [{type: Schema.Types.ObjectId, ref: 'ProductSKUImage'}],
    options: [{type: Schema.Types.ObjectId, ref: 'ProductAttributeOption'}],

},{timestamps: true});

const ProductSKU = mongoose.model<IProductSKU>("ProductSKU", ProductSKUSchema);
export default ProductSKU;

