import ProductAttribute from "../../models/Product/ProductAttribute.js";
import createError from "http-errors";
import {Types} from "mongoose";
import ProductAttributeOption from "../../models/Product/ProductAttributeOption.js";
import ProductAttributeOptionService from "./ProductAttributeOptionService.js";

export default {
    /**
     * Find attributes with the given parameters in the database.
     * If no parameters are given, all attributes are returned.
     * @param conditions - A collection of database queries.
     * @returns A collection of attributes.
     */
    async find(conditions = {}) {
        return ProductAttribute.find(conditions).populate('options');
    },

    /**
     * Finds the first attribute that matches the given parameters.
     * @param conditions - A collection of database queries.
     * @returns The first found ProductAttribute.
     */
    async findOne(conditions = {}) {
       return ProductAttribute.findOne(conditions).populate('options');
    },

    /**
     * Finds the attribute by ID.
     * @param id - The ID of the attribute.
     * @returns The attribute with matching ID.
     */
    async findByID(id: string) {
        if (!Types.ObjectId.isValid(id)) throw createError('Invalid Attribute ID Format.');
        return ProductAttribute.findById(id).populate('options');
    },

    /**
     * Finds the attribute by ID or throw a 404 error.
     * @param id - The ID of the attribute.
     * @returns The attribute with matching ID.
     */
    async existsOr404(id: string) {
        if (!Types.ObjectId.isValid(id)) throw createError(400, 'Invalid Attribute ID Format.');
        const attribute = await ProductAttribute.findById(id);
        if (!attribute) throw createError(404, 'Attribute Not Found.');

        return attribute;
    },

    /**
     * Create a new ProductAttribute.
     * @param data The required fields for creating a ProductAttribute.
     * @returns The newly created attribute.
     */
    async create(data: any) {
        return ProductAttribute.create(data);
    },

    /**
     * Update an attribute by its ID.
     * @param attributeID The ID of the attribute.
     * @param data The fields with which to update the attribute.
     * @returns The newly-updated attribute.
     */
    async update(attributeID: string, data: any) {
        await this.findByIDOr404(attributeID);
        return await ProductAttribute.findByIdAndUpdate(attributeID, data, {new: true}).populate('options');
    },

    /**
     * Delete the attribute.
     * @param attributeID The ID of the attribute.
     */
    async destroy(attributeID: string) {
        const attribute = await this.existsOr404(attributeID);
        await attribute.deleteOne();
    },

    async deleteAttributeOptions(id: string) {
        await ProductAttributeOptionService.deleteMany({attribute: id});
    }
}