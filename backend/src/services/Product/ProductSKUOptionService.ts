import ProductSKU from "../../models/Product/ProductSKU.js";

import ProductSKUService from "./ProductSKUService.js";
import ProductAttributeOptionService from "./ProductAttributeOptionService.js";
import ProductSKURepository from "../../repositories/ProductSKURepository.js";
import ProductAttributeOptionRepository from "../../repositories/ProductAttributeOptionRepository.js";

export default {
    async addOptionToSKU(skuID: string, optionID: string) {
        const skuCheck = await ProductSKU.findOne({_id: skuID, "options": optionID}).populate('options');
        if (skuCheck) return skuCheck;

        await ProductSKURepository.existsOr404Lean(skuID);
        await ProductAttributeOptionRepository.existsOr404Lean(optionID);

        return ProductSKU
            .findByIdAndUpdate({_id: skuID}, {$push: {options: optionID}}, {new: true})
            .populate('options');
    },

    async removeOptionFromSKU(skuID: string, optionID: string) {
        await ProductSKUService.existsOr404(skuID);
        await ProductAttributeOptionService.existsOr404(optionID);

        return ProductSKU
            .findByIdAndUpdate({_id: skuID}, {$pull: {options: optionID}}, {new : true})
            .populate('options');
    }
}