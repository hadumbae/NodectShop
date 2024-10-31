import Product from "./Product.js";
import ProductSKUImage from "./ProductSKUImage.js";

export const primaryImage = function () {
    if (this.images.length > 0) {
        let image = this.images.find(x => x.isPrimary === true);
        return !image ? this.images[0] : image;
    }

    return null;
};

export const postSave = async function() {
    await Product.updateOne({_id: this.product}, {$push: {skus: this._id}});
};

export const preDeleteOne = async function() {
    await Product.updateOne({_id: this.product}, {$pull: {skus: this._id}});
    const images = await ProductSKUImage.where({sku: this._id});
    images.forEach(async (image) => await image.deleteOne());
};