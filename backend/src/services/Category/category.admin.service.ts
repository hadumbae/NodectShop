import _ from 'lodash';
import createError from 'http-errors';

import Category from '../../models/Category.js';
import Product from "../../models/Product/Product.js";
import ProductSKU from "../../models/Product/ProductSKU.js";
import CategoryRepository from "../../repositories/CategoryRepository.js";
import ProductAdminService from "../Product/product.admin.service.js";

const CategoryAdminService = {
	async findById(categoryID: string) {
		const category = await Category.findById(categoryID).lean();
		if (!category) createError(404, "Category Not Found.");

		const products = await Product.find({category: categoryID}).populate('skus').lean();
		const skus = await  ProductSKU.find({product: {$in: category.products}}).populate('product').populate('supplier').lean();

		return {category, products, skus};
	},

	async fetchCategoryWithData(categoryID: string) {
		const category = await CategoryRepository.existsOr404(categoryID);
		const products: {} = await ProductAdminService.fetchPopulatedProducts({category: categoryID});

		return {category, products};
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

export default CategoryAdminService;
