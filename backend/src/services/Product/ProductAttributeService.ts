import createError from "http-errors";
import ProductAttribute from "../../models/Product/ProductAttribute.js";

export default {
    async fetchPaginatedAttributes(currentPage: any = 1, perPage: any = 15, conditions = {}, sort = {}) {
        if (isNaN(currentPage) || isNaN(perPage)) throw createError(400, "Invalid Pagination Error.");

        return ProductAttribute.find(conditions)
            .sort(sort)
            .skip((currentPage - 1) * perPage)
            .limit(perPage)
            .populate('options')
            .lean();
    },





}