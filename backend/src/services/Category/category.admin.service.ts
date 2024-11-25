import _ from 'lodash';
import createError from 'http-errors';

import Category, {CategoryMode, ICategory} from '../../models/category.schema.js';
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
};

export default CategoryAdminService;
