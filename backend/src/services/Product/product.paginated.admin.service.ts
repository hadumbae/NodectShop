import createError from 'http-errors';

import Product from '../../models/Product/product.schema.js';
import ProductRepository from "../../repositories/ProductRepository.js";
import ProductImageAdminService from "./product.image.admin.service.js";
import {ProductDataSchema} from "../../schemas/product.zod.schema.js";
import createHttpError from "http-errors";
import {ICategory} from "../../models/category.schema.js";
import CategoryRepository from "../../repositories/CategoryRepository.js";
import ProductFetchAdminService from "./product.fetch.admin.service.js";
import {QueryWithHelpers} from "mongoose";

const ProductPaginatedAdminService = {
    processPaginationQuery(pageQuery) {
        const conditions: Function[] = [];

        const currentPage = pageQuery.page || 1;
        const perPage = pageQuery.perPage || 15;

        const { title, tags } = pageQuery;


        if (title) {
            const regex = new RegExp(`.*${title}.*`, "i");
            conditions.push((query: QueryWithHelpers<any, any>) => query.where("title").regex(regex));
        }

        if (tags) {
            conditions.push((query: QueryWithHelpers<any, any>) => query.where("tags").in(tags.split(",")));
        }

        if (tags) {
            conditions.push((query: QueryWithHelpers<any, any>) => query.where("tags").in(tags.split(",")));
        }

        return {currentPage, perPage, conditions};
    },

    async fetchPaginatedProducts(currentPage: any = 1, perPage: any = 15, conditions: Function[] = []) {
        if (isNaN(currentPage) || isNaN(perPage)) throw createError(400, "Invalid Pagination Error.");

        let productQuery = Product.find({});

        for (const condition of conditions) {
            console.log(condition);
            productQuery = condition(productQuery);
        }

        return productQuery.skip((currentPage - 1) * perPage).limit(perPage)
            .populate("skus").populate("skus.options").lean()
    },
};

export default ProductPaginatedAdminService;
