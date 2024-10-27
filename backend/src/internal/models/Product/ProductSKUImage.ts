import mongoose, {Schema, Types} from 'mongoose';

export interface IProductSKUImage {
    readonly _id?: string;
    sku: Types.ObjectId;
    secure_url: string;
    public_id: string;
    isPrimary: boolean;
}

const ProductSKUImageSchema = new Schema<IProductSKUImage>({
    sku: {type: Schema.Types.ObjectId, ref: 'ProductSKU', required: true},
    secure_url: {type: String, required: true},
    public_id: {type: String, required: true},
    isPrimary: {type: Boolean, default: false},
},{timestamps: true});

const ProductSKUImage = mongoose.model<IProductSKUImage>("ProductSKUImage", ProductSKUImageSchema);
export default ProductSKUImage;
