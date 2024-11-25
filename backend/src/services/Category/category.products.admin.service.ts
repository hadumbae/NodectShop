import CategoryRepository from "../../repositories/CategoryRepository.js";
import {ICategory} from "../../models/category.schema.js";
import ProductFetchAdminService from "../Product/product.fetch.admin.service.js";
import Product, {IProduct} from "../../models/Product/product.schema.js";
import {ZProduct} from "../../schemas/product.zod.schema.js";

const CategoryProductsAdminService = {
    async paginateCategoriesWithProductCount(page, perPage) {
        const categories: any[] = await CategoryRepository.paginatedLean(page, perPage);

        return Promise.all(categories.map(async (category: ICategory) => {
            let findParam;

            if (category.mode === "MANUAL") {
                findParam = {_id: {$in: category.products}};
            } else if (category.mode === "TYPE") {
                findParam = {type: {$in : category.modeTypes}}
            } else if (category.mode === "TAGS") {
                findParam = {tags: {$in: category.modeTags}}
            } else {
                throw new Error("Invalid Category Mode!");
            }

            const productCount: number = await Product.find(findParam).countDocuments();
            return {...category, productCount};
        }));
    },

    async fetchPaginatedProductsByCategory(categoryID: string, page: number, perPage: number) {
        const category: ICategory = await CategoryRepository.existsOr404Lean(categoryID);

        let findParam;

        if (category.mode === "MANUAL") {
            findParam = {_id: {$in: category.products}};
        } else if (category.mode === "TYPE") {
            findParam = {type: {$in : category.modeTypes}}
        } else if (category.mode === "TAGS") {
            findParam = {tags: {$in: category.modeTags}}
        } else {
            throw new Error("Invalid Category Mode!");
        }

        const totalItems: number = await Product.find(findParam).countDocuments();
        const products: IProduct[] = await Product.find(findParam)
            .skip((page - 1) * perPage).limit(perPage)
            .populate("skus").populate('skus.options').lean()

        return {totalItems, products};
    },
};

export default CategoryProductsAdminService;