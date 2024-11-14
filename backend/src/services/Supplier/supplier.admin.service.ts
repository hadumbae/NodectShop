import Supplier from '../../models/Supplier.js';
import ProductSKU from "../../models/Product/ProductSKU.js";

const SupplierAdminService = {
	/**
	 * Finds the supplier by ID or throw a 404 error.
	 * @param id - The ID of the supplier.
	 * @returns The supplier with matching ID.
	 */
	async findByID(id) {
		return Supplier.findById(id);
	},

	async fetchPaginatedProducts(supplierID: string, currentPage: any = 1, perPage: any = 15, conditions = {}, sort = {}) {
		return ProductSKU.where({supplier: supplierID})
			.sort(sort)
			.skip((currentPage - 1) * perPage)
			.limit(perPage)
			.populate("options")
			.populate("images")
			.populate({
				path: "product",
				populate: {
					path: "category",
					model: "Category"
				}
			});
	}
};

export default SupplierAdminService;