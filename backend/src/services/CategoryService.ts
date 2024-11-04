import _ from 'lodash';
import createError from 'http-errors';

import Category from '../models/Category.js';
import Product from "../models/Product/Product.js";
import ProductSKU from "../models/Product/ProductSKU.js";

const CategoryService = {
	async fetchPaginatedCategories(currentPage: any = 1, perPage: any = 15, conditions = {}, sort = {}) {
		if (isNaN(currentPage) || isNaN(perPage)) throw createError(400, "Invalid Pagination Error.");

		const paginated = await Category.find(conditions)
			.sort(sort)
			.skip((currentPage - 1) * perPage)
			.limit(perPage)
			.populate('products')
			.lean();

		// TODO
		// Create Product Collections
	},

	async fetchCategoryWithData(categoryID: string) {
		const category = await Category.findById(categoryID).lean();
		if (!category) createError(404, "Category Not Found.");

		const products = await Product.find({category: categoryID}).populate('skus').lean();
		const skus = await  ProductSKU.find({product: {$in: category.products}}).populate('product').populate('supplier').lean();

		return {category, products, skus};
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

		// data.slug = await slugify(data.category);
		data.products = [];

		return await Category.create(data);
	},

	/**
	 * Update a category by it's ID.
	 * @param categoryID The ID of the category.
	 * @param data The fields with which to update the category.
	 */
	async update(categoryID: string, data: any) {
		const category = await Category.findById(categoryID).lean();
		if (!category) throw createError(404, 'Category Not Found.');

		return Category.findByIdAndUpdate(categoryID, data, {new: true});
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

	async build() {
		const categories = [
			"Electronics",
			"Home Appliances",
			"Fashion",
			"Beauty and Personal Care",
			"Sports and Fitness",
			"Toys and Games (board",
			"Books",
			"Automotive",
			"Furniture",
			"Home Decor",
			"Office Supplies",
			"Groceries",
			"Jewelry and Watches",
			"Pet Supplies",
			"Baby Products",
			"Garden and Outdoor",
			"Health and Wellness",
			"Kitchen and Dining",
			"Travel and Luggage",
			"Music Instruments",
			"Arts and Crafts",
			"Photography and Video",
			"Computer Components",
			"Software",
			"Industrial Supplies",
			"Wedding Supplies",
			"Collectibles",
			"Educational Supplies",
			"Eco-friendly Products",
			"Luxury Items",
			"Outdoor Gear",
			"Fitness Apparel",
			"Camping Equipment",
			"Cleaning Supplies",
			"Smart Home Devices",
			"Virtual Reality Gear",
			"DIY and Home Improvement",
			"Fishing Equipment",
			"Cycling Gear",
			"Video Games",
			"Protective Gear",
			"Small Kitchen Appliances",
			"Lighting Fixtures",
			"Seasonal Decor",
			"Event Supplies",
			"Hobby Supplies",
			"Subscription Boxes",
			"Medical Supplies",
			"Eco-friendly Packaging",
			"Office Electronics",
			"Home Security Systems",
			"Renewable Energy Products",
			"Survival Gear",
			"Exotic Foods",
			"Organic Groceries",
			"Vintage Clothing",
			"High-tech Gadgets",
			"Educational Toys",
			"Child Safety Products",
			"Professional Equipment",
		];

		for (const category of categories) {
			await Category.create({category: category, slug: await slugify(category)});
		}
	}
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
