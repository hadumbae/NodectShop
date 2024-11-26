import mongoose, {Schema, Types} from 'mongoose';
import {IProduct} from "./product.schema.js";
import {postSave, preDeleteImageOne, preDeleteOne, primaryImage} from "./ProductSKU.methods.js";
import {IProductAttributeOption} from "./ProductAttributeOption.js";

export interface IProductSKUImage {
    readonly _id?: string;
    isPrimary: boolean;
    secure_url: string;
    public_id: string;
}

export interface IProductSKU {
    readonly id?: Types.ObjectId;
    product: Types.ObjectId | IProduct;
    supplier: Types.ObjectId;
    name: string;
    code: string;
    unitPrice: number;
    unitStock: number;
    reorderLevel: number;
    shouldReorder: boolean;
    isDiscontinued: boolean;
    images: IProductSKUImage[];
    options: IProductAttributeOption[];
    save: () => void;
}

const ProductSKUImageSchema = new Schema<IProductSKUImage>({
    isPrimary: {type: Boolean, default: false},
    secure_url: {type: String, required: true},
    public_id: {type: String, required: true},
},{timestamps: true});

const ProductSKUSchema = new Schema<IProductSKU>({
    product: {type: Schema.Types.ObjectId, ref: 'Product', required: true},
    supplier: {type: Schema.Types.ObjectId, ref: 'Supplier', required: false, default: null},

    name: {type: String, required: true},
    code: {type: String, required: true},
    unitPrice: {type: Number, required: [true, "Unit Price required."]},
    unitStock: {type: Number, required: [true, "Unit Stock required."]},
    reorderLevel: {type: Number, required: [true, "Reorder Level required."]},
    shouldReorder: {type: Boolean, default: false, required: false},
    isDiscontinued: {type: Boolean, default: false, required: [true, "Discontinued Status required."]},

    images: {type: [ProductSKUImageSchema], default: []},
    options: {type: [{type: Schema.Types.ObjectId, ref: 'ProductAttributeOption'}], default: []},

},{timestamps: true});

// Methods

ProductSKUSchema.methods.primaryImage = primaryImage;

// Middleware

ProductSKUSchema.post('save', {document: true, query: false}, postSave);
ProductSKUSchema.pre('deleteOne', {document: true, query: false}, preDeleteOne);
ProductSKUImageSchema.pre('deleteOne', {document: true, query: false}, preDeleteImageOne);

// Model
const ProductSKU = mongoose.model<IProductSKU>("ProductSKU", ProductSKUSchema);
export default ProductSKU;

