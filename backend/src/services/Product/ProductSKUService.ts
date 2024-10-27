import {Types} from "mongoose";

import ProductSKU, {IProductSKU} from "../../internal/models/Product/ProductSKU.js";

import ProductService from "../ProductService.js";
import SupplierService from "../Supplier/SupplierService.js";
import ProductSKUImageService from "./ProductSKUImageService.js";
import createError from "http-errors";
import {IProductSKUImage} from "../../internal/models/Product/ProductSKUImage.js";

interface ProductSKUInputData {
    product: string;
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
    async create(data: ProductSKUInputData) {
        // Checks
        const product = await ProductService.findByIDOr404(data.product);
        const supplier = await SupplierService.findByIDOr404(data.supplier);

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
        const sku = await this.findByIDOr404(id);
        const product = await ProductService.findByIDOr404(data.product);
        const supplier = await SupplierService.findByIDOr404(data.supplier);

        sku.product = product._id;
        sku.supplier = supplier._id;
        sku.code = data.code;
        sku.unitPrice = data.unitPrice;
        sku.unitStock = data.unitStock;
        sku.reorderLevel = data.reorderLevel;
        sku.isDiscontinued = data.isDiscontinued;

        await sku.save();

        return sku;
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
    }
};

