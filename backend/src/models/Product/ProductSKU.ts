import mongoose, {Schema, Types} from 'mongoose';
import {IProductAttributeOption} from "./ProductAttributeOption.js";
import ProductSKUImage, {IProductSKUImage} from "./ProductSKUImage.js";
import Product, {IProduct} from "./Product.js";
import {postSave, preDeleteOne, primaryImage} from "./ProductSKUMethods.js";

export interface IProductSKU {
    readonly id?: string;
    product: Types.ObjectId | IProduct;
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
    options: {type: [{type: Schema.Types.ObjectId, ref: 'ProductAttributeOption'}]},

},{timestamps: true});

// Methods

ProductSKUSchema.methods.primaryImage = primaryImage;

// Middleware

ProductSKUSchema.post('save', {document: true, query: false}, postSave);
ProductSKUSchema.pre('deleteOne', {document: true, query: false}, preDeleteOne);

// Model
const ProductSKU = mongoose.model<IProductSKU>("ProductSKU", ProductSKUSchema);
export default ProductSKU;

