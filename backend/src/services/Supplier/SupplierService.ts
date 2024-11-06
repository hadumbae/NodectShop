import _ from 'lodash';
import createError from 'http-errors';

import Supplier from '../../models/Supplier.js';
import { ContactPersonType } from '../../types/SupplierTypes.js';
import mongoose from "mongoose";
import Product from "../../models/Product/Product.js";
import ProductSKU from "../../models/Product/ProductSKU.js";

const SupplierService = {
	/**
	 * Finds the supplier by ID or throw a 404 error.
	 * @param id - The ID of the supplier.
	 * @returns The supplier with matching ID.
	 */
	async findByID(id) {
		return Supplier.findById(id);
	},

	/**
	 * Update a supplier by it's ID.
	 * @param supplierID The ID of the supplier.
	 * @param data The fields with which to update the supplier.
	 */
	async update(supplierID: string, data: any) {
		const oldSupplier = await Supplier.findById(supplierID);

		if (data.slug) throw createError(400, 'Slug Should Not Be Included In Requests. Please Try Again.');
		if (!oldSupplier) throw createError(404, 'Supplier Not Found. Verify Supplier ID.');

		if (data.name != oldSupplier.name) {
			data.slug = await slugify(data.name);
		}

		await Supplier.findByIdAndUpdate(supplierID, data);
	},

	async fetchProducts(supplierID: string) {
		return ProductSKU
			.where({supplier: supplierID})
			.populate("product")
			.populate("options")
			.populate("images");
	}
};

export default SupplierService;

const slugify = async (name: string) => {
	const slug = _.kebabCase(name);
	const num = await Supplier.countDocuments({ slug: { $regex: `.*${slug}.*` } });

	if (num > 0) {
		return `${slug}-${num}`;
	}

	return slug;
};
