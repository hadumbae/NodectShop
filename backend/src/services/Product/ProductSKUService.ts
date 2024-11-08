import {Types} from "mongoose";

import ProductSKU, {IProductSKU} from "../../models/Product/ProductSKU.js";

import ProductService from "../ProductService.js";
import SupplierService from "../Supplier/SupplierService.js";
import ProductSKUImageService from "./ProductSKUImageService.js";
import createError from "http-errors";
import Product from "../../models/Product/Product.js";
import SupplierRepository from "../../repositories/SupplierRepository.js";
import ProductRepository from "../../repositories/ProductRepository.js";

interface ProductSKUInputData {
    supplier: string;
    code: string;
    unitPrice: number;
    unitStock: number;
    reorderLevel: number;
    isDiscontinued?: boolean;
}

export default {

    /**
     * Find products by conditions.
     * @param conditions The conditions by which to find products.
     * @returns The matching products.
     */
    async find(conditions = {}) {
        return ProductSKU.find(conditions);
    },

    /**
     * Finds the product by ID.
     * @param id - The ID of the product.
     * @returns The product with matching ID.
     */
    async findOne(conditions = {}) {
        return ProductSKU.findOne(conditions);
    },

    /**
     * Throws a 404 error if product SKU does not exist.
     * @param id - The ID of the supplier.
     * @returns The supplier with matching ID.
     */
    async existsOr404(id) {
        if (!Types.ObjectId.isValid(id)) throw createError(400, "Invalid SKU ID.");
        const sku = await ProductSKU.findById(id).populate('images');
        if (!sku) throw createError(404, 'Product SKU Not Found.');
        return sku;
    },

    /**
     * Throws a 404 error if product SKU does not exist.
     * @param id - The ID of the supplier.
     * @returns The supplier with matching ID.
     */
    async existsLeanOr404(id) {
        if (!Types.ObjectId.isValid(id)) throw createError(400, "Invalid SKU ID.");
        const sku = await ProductSKU.findById(id).populate('images').lean();
        if (!sku) throw createError(404, 'Product SKU Not Found.');
        return sku;
    },

    /**
     * Create a product SKU.
     * @param data The data with which to create the product SKU.
     * @return The newly created product SKU.
     */
    async create(productID: string, data: ProductSKUInputData) {
        // Checks
        await ProductRepository.existsOr404Lean(productID);
        await SupplierRepository.existsOr404Lean(data.supplier);

        // Create
        return ProductSKU.create({
            product: productID,
            supplier: data.supplier,
            code: data.code,
            unitPrice: data.unitPrice,
            unitStock: data.unitStock,
            reorderLevel: data.reorderLevel,
            isDiscontinued: data.isDiscontinued,
            options: [],
            images: [],
        });
    },

    /**
     * Update a specified product SKU with the provided data.
     * @param id The ID of the product SKU to be updated.
     * @param data The data with which to update the product SKU.
     * @return The updated product SKU.
     */
    async update(id: string, data: ProductSKUInputData) {
        // Checks
        await this.findByIDOr404(id);
        await SupplierRepository.existsOr404Lean(data.supplier);

        // Update
        return await ProductSKU.findByIdAndUpdate(id, data, {new: true});
    },

    /**
     * Delete the product SKU and delete any associated images.
     * @param id The ID of the product SKU to be deleted.
     */
    async delete(id: string): Promise<void> {
        await this.existsOr404(id);
        await ProductSKU.deleteOne({_id: id});
    },

    /**
     * Remove the specified SKU from a product.
     * @param skuID The ID of the SKU.
     * @param productID The ID of the product.
     */
    async removeSKUFromProduct(skuID: string, productID: string) {
        await Product.updateOne({_id: productID}, {$pull: {skus: skuID}});
    },
};

