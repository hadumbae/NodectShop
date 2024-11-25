import createError from 'http-errors';

import Product from '../../models/Product/product.schema.js';
import ProductRepository from "../../repositories/ProductRepository.js";
import ProductImageAdminService from "./product.image.admin.service.js";
import {ProductDataSchema} from "../../schemas/product.zod.schema.js";
import createHttpError from "http-errors";

const ProductAdminService = {
	async createProduct(data: any, uploadImage) {
		console.log("Before Create: ", data);
		const result: any = ProductDataSchema.safeParse(data);
		console.log("After Parse: ", result);

		if (!result.success) {
			const error = result.error.issues[0];
			const errorMessage = `${error.path.join(".")} : ${error.message}`;
			throw createHttpError(400, errorMessage)
		}

		result.data.image = await ProductImageAdminService.createProductImages(uploadImage);
		return Product.create(result.data);
	},

	async updateProduct(productID: string, data: any, uploadImage) {
		const product = await Product.findById(productID);
		if (!product) throw createError(404, "Product Not Found.");
		const result: any = ProductDataSchema.safeParse(data);

		if (!result.success) {
			const error = result.error.issues[0];
			const errorMessage = `${error.path.join(".")} : ${error.message}`;
			throw createHttpError(400, errorMessage)
		}

		if (uploadImage) {
			result.data.image = await ProductImageAdminService.createProductImages(uploadImage);
			await ProductImageAdminService.deleteProductImage(product.image);
		} else {
			result.data.image = product.image;
		}

		return Product.findByIdAndUpdate(product._id, result.data, {new: true}).lean();
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
		return query.populate('skus').populate('skus.options').lean();
	},
};

export default ProductAdminService;
