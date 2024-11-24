import Product from "../../models/Product/product.schema.js";

const ProductFetchAdminService = {
    async countProductsByType(type: string) {
        return Product.find({type: type}).countDocuments();
    },

    async fetchPaginatedProductsByType(type: string, page: number, perPage: number) {
        return Product.find({type: type}).skip((page - 1) * perPage).limit(perPage).populate("skus").populate("skus.options").lean();
    },

    async countProductsByTags(tags: string[]) {
        return Product.find({tags: { $all : tags}}).countDocuments();
    },

    async fetchPaginatedProductsByTags(tags: string[], page: number, perPage: number) {
        return Product.find({tags: { $all : tags}}).skip((page - 1) * perPage).limit(perPage).populate("skus").populate("skus.options").lean();
    }
};

export default ProductFetchAdminService;