import mongoose, {Schema, Types} from 'mongoose';
import {IProductAttributeOption} from "./ProductAttributeOption.js";
import {IProductSKUImage} from "./ProductSKUImage.js";
import ProductSKUImageService from "../../services/Product/ProductSKUImageService.js";
import ProductSKUService from "../../services/Product/ProductSKUService.js";

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
    product: {type: Schema.Types.ObjectId, ref: 'Product', required: true},
    supplier: {type: Schema.Types.ObjectId, ref: 'Supplier', required: false, default: null},

    code: {type: String, required: true},
    unitPrice: {type: Number, required: [true, "Unit Price required."]},
    unitStock: {type: Number, required: [true, "Unit Stock required."]},
    reorderLevel: {type: Number, required: [true, "Reorder Level required."]},
    isDiscontinued: {type: Boolean, default: false, required: [true, "Discontinued Status required."]},

    images: {type: [{type: Schema.Types.ObjectId, ref: 'ProductSKUImage'}], required: true},
    options: [{type: Schema.Types.ObjectId, ref: 'ProductAttributeOption'}],

},{timestamps: true});

// Middleware

const deleteCallback = async (doc) => {
    console.log(doc);
    await ProductSKUImageService.deleteMany({sku: doc._id});
    await ProductSKUService.removeSKUFromProduct(doc._id.toString(), doc.product.toString());
};

ProductSKUSchema.pre('deleteMany', deleteCallback);
ProductSKUSchema.pre('deleteOne', deleteCallback);

// Model
const ProductSKU = mongoose.model<IProductSKU>("ProductSKU", ProductSKUSchema);
export default ProductSKU;

