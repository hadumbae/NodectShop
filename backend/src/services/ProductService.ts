import _ from 'lodash';
import createError from 'http-errors';
import mongoose from 'mongoose';

import Product from '../models/Product/Product.js';

const ProductService = {
	/**
	 * Count the number of products with the given parameters in the database.
	 * @param conditions Object
	 * @returns The number of products.
	 */
	async countProducts(conditions = {}) {
		return Product.countDocuments(conditions);
	},

	/**
	 * Find products with the given parameters in the database.
	 * If no parameters are given, all products are returned.
	 * @param conditions - A collection of database queries.
	 * @returns A collection of products.
	 */
	async find(conditions = {}) {
		return Product.find(conditions);
	},

	/**
	 * Finds the first product that matches the given parameters.
	 * @param conditions - A collection of database queries.
	 * @returns The first found product.
	 */
	async findOne(conditions = {}) {
		return Product.findOne(conditions);
	},

	/**
	 * Finds the product by ID.
	 * @param id - The ID of the product.
	 * @returns The product with matching ID.
	 */
	async findByID(id: string) {
		if (!mongoose.Types.ObjectId.isValid(id)) throw createError('Invalid ID Format.');
		return Product.findById(id).populate('skus').populate('skus.options');
	},

	/**
	 * Throws a 404 error if product does not exist.
	 * @param id - The ID of the product.
	 * @returns The product with matching ID.
	 */
	async existsOr404(id: string) {
		if (!mongoose.Types.ObjectId.isValid(id)) throw createError('Invalid Product ID Format.');
		const product = await Product.findById(id);
		if (!product) throw createError(404, 'Product Not Found.');

		return product;
	},

	/**
	 * Create a new product.
	 * @param data The required fields for creating a product.
	 * @returns The newly created product.
	 */
	async create(data: any) {
		data.slug = await slugify(data.title);
		return await Product.create(data);
	},

	/**
	 * Update a product by its ID.
	 * @param productID The ID of the product.
	 * @param data The fields with which to update the product.
	 */
	async update(productID: string, data: any) {
		const product = await Product.findById(productID);

		// Checks
		if (data.slug) throw createError(400, 'Slug Should Not Be Included In Requests. Please Try Again.');
		if (!product) throw createError(404, 'Product Not Found. Verify Product ID.');

		// Sluggify
		if (data.title != product.title) {
			data.slug = await slugify(data.title);
		}

		return Product.findByIdAndUpdate(productID, data, { new: true });
	},

	/**
	 * Delete the product.
	 * @param productID The ID of the product.
	 */
	async destroy(productID: string) {
		const product = await Product.findById(productID);
		if (!product) throw createError(404, 'Product Not Found. Verify Product ID.');

		await product.deleteOne();

		return product;
	},
};

export default ProductService;

/**
 * Sluggify the product name.
 * @param product The product name as a string.
 * @return The sluggified product name.
 */
const slugify = async (product: string): Promise<string> => {
	const slug = _.kebabCase(product);
	const num = await Product.countDocuments({ slug: { $regex: `.*${slug}.*` } });

	if (num > 0) {
		return `${slug}-${num}`;
	}

	return slug;
};
