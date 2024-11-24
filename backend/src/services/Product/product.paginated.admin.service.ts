import createError from 'http-errors';

import Product from '../../models/Product/product.schema.js';
import ProductRepository from "../../repositories/ProductRepository.js";
import ProductImageAdminService from "./product.image.admin.service.js";
import {ProductDataSchema} from "../../validation/schemas/product.validate.js";
import createHttpError from "http-errors";
import {ICategory} from "../../models/Category.js";
import CategoryRepository from "../../repositories/CategoryRepository.js";
import ProductFetchAdminService from "./product.fetch.admin.service.js";

const ProductPaginatedAdminService = {
    processPaginationQuery(pageQuery) {
        const conditions = {};

        const currentPage = pageQuery.page || 1;
        const perPage = pageQuery.perPage || 15;

        const { title } = pageQuery;

        if (title) {
            conditions['title'] = { $regex: `.*${title}.*`, $options: 'i' }
        }

        return {currentPage, perPage, conditions};
    },

    async fetchPaginatedProducts(currentPage: any = 1, perPage: any = 15, conditions = {}) {
        if (isNaN(currentPage) || isNaN(perPage)) throw createError(400, "Invalid Pagination Error.");

        return Product.find(conditions)
            .skip((currentPage - 1) * perPage).limit(perPage)
            .populate("skus").populate("skus.options").lean();
    },
};

export default ProductPaginatedAdminService;
