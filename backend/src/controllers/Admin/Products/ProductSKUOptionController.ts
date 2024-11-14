import {Request, Response, NextFunction} from "express";
import {isHttpError} from "http-errors";
import {validationResult} from "express-validator";

import ProductSKUOptionService from "../../../services/SKU/product.sku.option.admin.service.js";

export default {
    async addOptionToSKU(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({message: "Validation failed.", errors: errors.array()});

            const {skuID, optionID} = req.body;
            const sku = await ProductSKUOptionService.addOptionToSKU(skuID, optionID);

            return res.status(200).json({message: "Successfully added.",  data: sku});
        }   catch (error) {
            if (isHttpError(error)) res.status(500);
            next(error);
        }
    },

    async removeOptionFromSKU(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({message: "Validation failed.", errors: errors.array()});

            const {skuID, optionID} = req.body;
            const sku = await ProductSKUOptionService.removeOptionFromSKU(skuID, optionID);

            return res.status(200).json({message: "Successfully removed.",  data: sku});
        }   catch (error) {
            if (isHttpError(error)) res.status(500);
            next(error);
        }
    }
}