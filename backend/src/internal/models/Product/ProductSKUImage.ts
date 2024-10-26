import mongoose, {Schema, Types} from 'mongoose';

export interface IProductSKUImage {
    product: Types.ObjectId;
    sku: Types.ObjectId;
    secure_url: string;
    public_id: string;
}

const ProductSKUImageSchema = new Schema<IProductSKUImage>({
    product: {type: Schema.Types.ObjectId, ref: 'Product'},
    sku: {type: Schema.Types.ObjectId, ref: 'ProductSKU'},
    secure_url: {type: String, required: true},
    public_id: {type: String, required: true},
},{timestamps: true});

const ProductSKUImage = mongoose.model<IProductSKUImage>("ProductSKUImage", ProductSKUImageSchema);
export default ProductSKUImage;
