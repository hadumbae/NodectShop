import _ from 'lodash';
import createError from 'http-errors';

import Product from '../internal/models/Product.js';

const ProductService = {
	/**
	 * Count the number of products with the given parameters in the database.
	 * @param conditions Object
	 * @returns The number of products.
	 */
	async countProducts(conditions = {}) {
		return await Product.countDocuments(conditions);
	},

	/**
	 * Find products with the given parameters in the database.
	 * If no parameters are given, all products are returned.
	 * @param conditions - A collection of database queries.
	 * @returns A collection of products.
	 */
	async find(conditions = {}) {
		const products = await Product.find(conditions);
		return products;
	},

	/**
	 * Finds the first product that matches the given parameters.
	 * @param conditions - A collection of database queries.
	 * @returns The first found product.
	 */
	async findOne(conditions = {}) {
		const product = await Product.findOne(conditions);
		if (!product) throw createError(404, 'Product Not Found. Please Try Again.');
		return product;
	},

	/**
	 * Finds the product by ID or throw a 404 error.
	 * @param id - The ID of the product.
	 * @returns The product with matching ID.
	 */
	async findByIDOr404(id) {
		const product = await Product.findById(id);
		if (!product) throw createError(404, 'Product Not Found. Verify Product ID.');
		return product;
	},

	/**
	 * Create a new product.
	 * @param data The required fields for creating a product.
	 * @returns The newly created product.
	 */
	async create(data: any) {
		if (!data.title) {
			throw createError(400, 'Unique Slug Could Not Be Created. Verify That A Similar Product Does Not Exist.');
		}

		if (data.products) {
			throw createError(400, 'Product Cannot Be Created With Initial Porudcts. Please Add Them Later.');
		}

		data.slug = await slugify(data.title);
		return await Product.create(data);
	},

	/**
	 * Update a product by it's ID.
	 * @param productID The ID of the product.
	 * @param data The fields with which to update the product.
	 */
	async update(productID: string, data: any) {
		const oldProduct = await Product.findById(productID);

		if (data.slug) throw createError(400, 'Slug Should Not Be Included In Requests. Please Try Again.');
		if (!oldProduct) throw createError(404, 'Product Not Found. Verify Product ID.');

		if (data.title != oldProduct.product) {
			data.slug = await slugify(data.title);
		}

		await Product.findByIdAndUpdate(productID, data);
	},

	/**
	 * Delete the product.
	 * @param productID The ID of the product.
	 */
	async destroy(productID: string) {
		const product = await Product.findById(productID);
		if (!product) throw createError(404, 'Product Not Found. Verify Product ID.');

		await Product.findByIdAndDelete(productID);
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
