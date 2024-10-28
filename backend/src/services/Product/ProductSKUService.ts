import {Types} from "mongoose";

import ProductSKU, {IProductSKU} from "../../models/Product/ProductSKU.js";

import ProductService from "../ProductService.js";
import SupplierService from "../Supplier/SupplierService.js";
import ProductSKUImageService from "./ProductSKUImageService.js";
import createError from "http-errors";
import {IProductSKUImage} from "../../models/Product/ProductSKUImage.js";
import Product from "../../models/Product/Product.js";

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
     * Finds the product by ID.
     * @param id - The ID of the product.
     * @returns The product with matching ID.
     */
    async findOne(conditions = {}) {
        return ProductSKU.findOne(conditions);
    },

    /**
     * Finds the supplier by ID or throw a 404 error.
     * @param id - The ID of the supplier.
     * @returns The supplier with matching ID.
     */
    async findByIDOr404(id) {
        if (!Types.ObjectId.isValid(id)) throw createError(400, "Invalid SKU ID.");
        const sku = await ProductSKU.findById(id).populate('images.mainImage');
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
        const product = await ProductService.existsOr404(productID);
        const supplier = await SupplierService.existsOr404(data.supplier);

        // Create
        const sku = await ProductSKU.create({
            product: product._id,
            supplier: supplier._id,
            code: data.code,
            unitPrice: data.unitPrice,
            unitStock: data.unitStock,
            reorderLevel: data.reorderLevel,
            isDiscontinued: data.isDiscontinued,
            options: [],
            images: [],
        });

        // Update
        product.skus.push(sku);
        await product.save();

        return sku;
    },

    /**
     * Update a specified product SKU with the provided data.
     * @param id The ID of the product SKU to be updated.
     * @param data The data with which to update the product SKU.
     * @return The updated product SKU.
     */
    async update(id: string, data: ProductSKUInputData) {
        // Checks
        const sku = await this.findByIDOr404(id);
        await SupplierService.existsOr404(data.supplier);

        // Update
        return await ProductSKU.findByIdAndUpdate(sku._id, data, {new: true});
    },

    /**
     * Delete the product SKU and delete any associated images.
     * @param id The ID of the product SKU to be deleted.
     */
    async delete(id: string): Promise<void> {
        if (!Types.ObjectId.isValid(id)) throw createError(400, "Invalid SKU ID.");
        const productSKU: IProductSKU = await ProductSKU.findById(id).populate('images');
        if (!productSKU) throw createError(404, "Product SKU Not Found.");

        for (let image of productSKU.images) {
            await ProductSKUImageService.deleteProductSKUImage(image._id);
        }

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

    /**
     * Delete all SKUs belonging to the product.
     * @param skuID
     */
    async deleteSKUByProduct(productID: string){
        await ProductSKU.deleteMany({product: productID});
    }
};

