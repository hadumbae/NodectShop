import _ from 'lodash';
import createError from 'http-errors';

import Category from '../models/Category.js';

const CategoryService = {
	/**
	 * Count the number of categories with the given parameters in the database.
	 * @param conditions Object
	 * @returns The number of categories.
	 */
	async countCategories(conditions = {}) {
		return await Category.countDocuments(conditions);
	},

	/**
	 * Find categories with the given parameters in the database.
	 * If no parameters are given, all categories are returned.
	 * @param conditions - A collection of database queries.
	 * @returns A collection of categories.
	 */
	async find(conditions = {}) {
		const categories = await Category.find(conditions);
		return categories;
	},

	/**
	 * Finds the first category that matches the given parameters.
	 * @param conditions - A collection of database queries.
	 * @returns The first found category.
	 */
	async findOne(conditions = {}) {
		const category = await Category.findOne(conditions);
		if (!category) throw createError(404, 'Category Not Found. Please Try Again.');
		return category;
	},

	/**
	 * Finds the category by ID or throw a 404 error.
	 * @param id - The ID of the category.
	 * @returns The category with matching ID.
	 */
	async findByIDOr404(id) {
		const category = await Category.findById(id);
		if (!category) throw createError(404, 'Category Not Found. Verify Category ID.');
		return category;
	},

	/**
	 * Create a new category.
	 * @param data The required fields for creating a category.
	 * @returns The newly created category.
	 */
	async create(data: any) {
		if (!data.category) {
			throw createError(400, 'Unique Slug Could Not Be Created. Verify That A Similar Category Does Not Exist.');
		}

		if (data.products) {
			throw createError(400, 'Category Cannot Be Created With Initial Porudcts. Please Add Them Later.');
		}

		data.slug = await slugify(data.category);
		data.products = [];

		return await Category.create(data);
	},

	/**
	 * Update a category by it's ID.
	 * @param categoryID The ID of the category.
	 * @param data The fields with which to update the category.
	 */
	async update(categoryID: string, data: any) {
		const oldCategory = await Category.findById(categoryID);

		if (data.slug) throw createError(400, 'Slug Should Not Be Included In Requests. Please Try Again.');
		if (!oldCategory) throw createError(404, 'Category Not Found. Verify Category ID.');

		if (data.category != oldCategory.category) {
			data.slug = await slugify(data.category);
		}

		await Category.findByIdAndUpdate(categoryID, data);
	},

	/**
	 * Delete the category.
	 * @param categoryID The ID of the category.
	 */
	async destroy(categoryID: string) {
		const category = await Category.findById(categoryID);
		if (!category) throw createError(404, 'Category Not Found. Verify Category ID.');

		await Category.findByIdAndDelete(categoryID);
	},
};

export default CategoryService;

/**
 * Sluggify the category name.
 * @param category The category name as a string.
 * @return The sluggified category name.
 */
const slugify = async (category: string): Promise<string> => {
	const slug = _.kebabCase(category);
	const num = await Category.countDocuments({ slug: { $regex: `.*${slug}.*` } });

	if (num > 0) {
		return `${slug}-${num}`;
	}

	return slug;
};
