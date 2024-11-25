import Product from "../../models/Product/product.schema.js";

const ProductFilterService = {
    async fetchAllTypesAndTags() {
        const productQuery = await Product.find({}).select("types tags").lean();
        const reduceFunc = (acc, cur) => {
            acc.types = [...acc.types, ...cur.types];
            acc.tags = [...acc.tags, ...cur.tags];
            return acc;
        };

        const productData = productQuery.reduce(reduceFunc, {types: [], tags: []});
        const tags = new Set(productData.tags);
        const types = new Set(productData.types);

        return {types: [...types], tags: [...tags]};
    }
};

export default ProductFilterService;