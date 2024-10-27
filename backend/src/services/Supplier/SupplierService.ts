import _ from 'lodash';
import createError from 'http-errors';

import Supplier from '../../internal/models/Supplier.js';
import { ContactPersonType } from '../../internal/types/SupplierTypes.js';
import mongoose from "mongoose";

const SupplierService = {
	/**
	 * Count the number of suppliers with the given parameters in the database.
	 * @param conditions Object
	 * @returns The number of suppliers.
	 */
	async countSuppliers(conditions = {}) {
		return await Supplier.countDocuments(conditions);
	},

	/**
	 * Find suppliers with the given parameters in the database.
	 * If no parameters are given, all suppliers are returned.
	 * @param conditions - A collection of database queries.
	 * @returns A collection of suppliers.
	 */
	async find(conditions = {}) {
		const suppliers = await Supplier.find(conditions);
		return suppliers;
	},

	/**
	 * Finds the first supplier that matches the given parameters.
	 * @param conditions - A collection of database queries.
	 * @returns The first found supplier.
	 */
	async findOne(conditions = {}) {
		const supplier = await Supplier.findOne(conditions);
		if (!supplier) throw createError(404, 'Supplier Not Found. Please Try Again.');
		return supplier;
	},

	/**
	 * Finds the supplier by ID or throw a 404 error.
	 * @param id - The ID of the supplier.
	 * @returns The supplier with matching ID.
	 */
	async findByID(id) {
		return Supplier.findById(id);
	},

	/**
	 * Finds the supplier by ID or throw a 404 error.
	 * @param id - The ID of the supplier.
	 * @returns The supplier with matching ID.
	 */
	async findByIDOr404(id) {
		if (!mongoose.Types.ObjectId.isValid(id)) throw createError('Invalid Supplier ID Format.');
		const supplier = await Supplier.findById(id);
		if (!supplier) throw createError(404, 'Supplier Not Found.');

		return supplier;
	},

	/**
	 * Create a new supplier.
	 * @param data The required fields for creating a supplier.
	 * @returns The newly created supplier.
	 */
	async create(data: any) {
		if (!data.name) {
			throw createError(400, 'Unique Slug Could Not Be Created. Verify That A Similar Supplier Does Not Exist.');
		}

		data.slug = await slugify(data.name);
		return await Supplier.create(data);
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

	/**
	 * Delete the supplier.
	 * @param supplierID The ID of the supplier.
	 */
	async destroy(supplierID: string) {
		const supplier = await Supplier.findById(supplierID);
		if (!supplier) throw createError(404, 'Supplier Not Found. Verify Supplier ID.');

		await Supplier.findByIdAndDelete(supplierID);
	},

	/**
	 * Update the given supplier's contact persons.
	 * @param supplierID The ID of the supplier to be modified.
	 * @param contactPersons The data of the supplier's (new) contact persons.
	 * @returns The updated supplier.
	 */
	async updateContactPersons(supplierID: string, contactPersons: ContactPersonType[]) {
		const supplier = await Supplier.findById(supplierID);
		if (!supplier) throw createError(404, 'Supplier Not Found. Verify Supplier ID.');

		supplier.contactPersons = contactPersons;
		supplier.save();

		return supplier;
	},
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
