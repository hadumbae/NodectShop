import ProductAttributeOption from "../../models/Product/ProductAttributeOption.js";
import createError from "http-errors";
import {Types} from "mongoose";
import ProductAttributeRepository from "../../repositories/ProductAttributeRepository.js";

export default {
    /**
     * Find attribute options with the given parameters in the database.
     * If no parameters are given, all options are returned.
     * @param conditions A collection of database queries.
     * @returns A collection of options.
     */
    async find(conditions = {}) {
        return ProductAttributeOption.find(conditions).populate('attribute');
    },

    /**
     * Finds the first option that matches the given parameters.
     * @param conditions A collection of database queries.
     * @returns The first found ProductAttributeOption.
     */
    async findOne(conditions = {}) {
        return ProductAttributeOption.findOne(conditions).populate('attribute');
    },

    /**
     * Finds the option by ID or throw a 404 error.
     * @param id The ID of the option.
     * @returns The option with matching ID.
     */
    async existsOr404(id: string) {
        if (!Types.ObjectId.isValid(id)) throw createError('Invalid Option ID Format.');
        const option = await ProductAttributeOption.findById(id).populate('attribute');
        if (!option) throw createError(404, 'Option Not Found.');

        return option;
    },

    /**
     * Create a new attribute option.
     * @param attributeID The data for creating an attribute option.
     * @param name The name for the attribute option.
     * @returns The newly created attribute option.
     */
    async create(name: string, attributeID: string) {
        await ProductAttributeRepository.existsOr404Lean(attributeID);
        const option = new ProductAttributeOption({name: name, attribute: attributeID});
        await option.save();

        return option;
    },

    /**
     * Update an option by its ID.
     * @param optionID The ID of the attribute option.
     * @param data The fields with which to update the attribute option.
     * @returns The updated attribute option.
     */
    async update(optionID: string, name: string) {
        await this.findByIDOr404(optionID);
        return ProductAttributeOption.findByIdAndUpdate(optionID, {name: name}, {new: true}).populate('attribute');
    },

    /**
     * Delete the option.
     * @param optionID The ID of the option.
     */
    async delete(optionID: string) {
        const option = await this.existsOr404(optionID);
        if (!option) throw createError(404, 'Option Not Found. Verify Option ID.');

        await option.deleteOne();
    },

    /**
     * Delete many attribute options by the provided conditions.
     * @param conditions The search conditions for the query.
     */
    async deleteMany(conditions: any) {
        await ProductAttributeOption.deleteMany(conditions).exec()
    }
}