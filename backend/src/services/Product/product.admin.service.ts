import createError from 'http-errors';

import Product from '../../models/Product/Product.js';
import ProductRepository from "../../repositories/ProductRepository.js";
import ProductImageAdminService from "./product.image.admin.service.js";
import {ProductDataSchema} from "../../validation/schemas/product.validate.js";
import createHttpError from "http-errors";

const ProductAdminService = {
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

		return this.populateProducts(Product.find(conditions).skip((currentPage - 1) * perPage).limit(perPage));
	},

	async createProduct(data: any, uploadImage) {
		const tags = data.tags.split(",");
		const result: any = ProductDataSchema.safeParse({...data, tags});

		if (!result.success) {
			const error = result.error.issues[0];
			const errorMessage = `${error.path.join(".")} : ${error.message}`;
			throw createHttpError(400, errorMessage)
		}

		result.data.image = await ProductImageAdminService.createProductImages(uploadImage);
		return Product.create(result.data);
	},

	/**
	 * Finds the product by ID.
	 * @param id - The ID of the product.
	 * @returns The product with matching ID.
	 */
	async fetchPopulatedProduct(id: string) {
		await ProductRepository.existsOr404(id);
		return this.populateProducts(Product.findById(id));
	},

	/**
	 * Finds the specified products.
	 * @param conditions The conditions to search with.
	 * @returns The product with matching ID.
	 */
	async fetchPopulatedProducts(conditions = {}) {
		return this.populateProducts(Product.find(conditions));

	},

	async populateProducts(query: any) {
		return query.populate("category").populate('skus').populate('skus.options').lean();
	}
};

export default ProductAdminService;
