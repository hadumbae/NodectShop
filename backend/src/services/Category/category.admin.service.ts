import _ from 'lodash';
import createError from 'http-errors';

import Category, {CategoryMode, ICategory} from '../../models/Category.js';
import Product, {IProduct} from "../../models/Product/product.schema.js";
import ProductSKU from "../../models/Product/ProductSKU.js";
import CategoryRepository from "../../repositories/CategoryRepository.js";
import ProductFetchAdminService from "../Product/product.fetch.admin.service.js";

const CategoryAdminService = {

	async findById(categoryID: string) {
		const category = await Category.findById(categoryID).lean();
		if (!category) createError(404, "Category Not Found.");

		const products = await Product.find({category: categoryID}).populate('skus').lean();
		const skus = await  ProductSKU.find({product: {$in: category.products}}).populate('product').populate('supplier').lean();

		return {category, products, skus};
	},

	async paginateCategoriesWithProductCount(page, perPage) {
		const categories: any[] = await CategoryRepository.paginatedLean(page, perPage);

		return Promise.all(categories.map(async (category: ICategory) => {
			let productCount = 0;

			if (category.mode === "MANUAL") {
				productCount = category.products.length;
			} else if (category.mode === "TYPE") {
				productCount = await ProductFetchAdminService.countProductsByType(category.modeType);
			} else if (category.mode === "TAGS") {
				productCount = await ProductFetchAdminService.countProductsByTags(category.modeTags);
			} else {
				throw new Error("Invalid Category Mode!");
			}

			return {...category, productCount};
		}));
	},

	async fetchPaginatedProductsByCategory(categoryID: string, page: number, perPage: number) {
		const category: ICategory = await CategoryRepository.existsOr404Lean(categoryID);

		let findParam;

		if (category.mode === "MANUAL") {
			findParam = {category: category._id};
		} else if (category.mode === "TYPE") {
			findParam = {type: category.modeType}
		} else if (category.mode === "TAGS") {
			findParam = {tags: {$all: category.modeTags}}
		} else {
			throw new Error("Invalid Category Mode!");
		}

		const totalItems: number = await Product.find(findParam).countDocuments();
		const products: IProduct[] = await Product.find(findParam)
			.skip((page - 1) * perPage).limit(perPage)
			.populate("skus").populate('skus.options').lean()

		return {totalItems, products};
	},
};

export default CategoryAdminService;
