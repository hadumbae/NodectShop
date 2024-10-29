import ProductSKU from "../../models/Product/ProductSKU.js";

import ProductSKUService from "./ProductSKUService.js";
import ProductAttributeOptionService from "./ProductAttributeOptionService.js";

export default {
    async addOptionToSKU(skuID: string, optionID: string) {
        const skuCheck = await ProductSKU.findOne({_id: skuID, "options.product": optionID});
        if (skuCheck) return skuCheck;

        await ProductSKUService.existsOr404(skuID);
        await ProductAttributeOptionService.existsOr404(optionID);

        return await ProductSKU.findByIdAndUpdate({_id: skuID}, {$push: {options: optionID}}, {new: true});
    },

    async removeOptionFromSKU(skuID: string, optionID: string) {
        await ProductSKUService.existsOr404(skuID);
        await ProductAttributeOptionService.existsOr404(optionID);

        return await ProductSKU.findByIdAndUpdate({_id: skuID}, {$pull: {options: optionID}}, {new : true}).populate('options');
    }
}