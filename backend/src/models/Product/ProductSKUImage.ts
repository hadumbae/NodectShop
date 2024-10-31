import mongoose, {Schema, Types} from 'mongoose';
import cloudinary from "../../configs/cloudinary-config.js";
import ProductSKU from "./ProductSKU.js";
import Product from "./Product.js";

export interface IProductSKUImage {
    readonly _id?: string;
    sku: Types.ObjectId;
    isPrimary: boolean;

    secure_url: string;
    public_id: string;
}

const ProductSKUImageSchema = new Schema<IProductSKUImage>({
    sku: {type: Schema.Types.ObjectId, ref: 'ProductSKU', required: true},
    isPrimary: {type: Boolean, default: false},

    secure_url: {type: String, required: true},
    public_id: {type: String, required: true},
},{timestamps: true});

ProductSKUImageSchema.post('save', {document: true, query: false}, async function (doc){
    await ProductSKU.updateOne({_id: this.sku}, {$push: {images: this._id}});
});

ProductSKUImageSchema.pre('deleteOne', {document: true, query: false}, async function (doc){
    await cloudinary.uploader.destroy(this.public_id);
    await ProductSKU.updateOne({_id: this.sku}, {$pull: {images: this._id}});
});

const ProductSKUImage = mongoose.model<IProductSKUImage>("ProductSKUImage", ProductSKUImageSchema);
export default ProductSKUImage;
