import {Request, Response, NextFunction} from "express";
import createError, {isHttpError} from "http-errors";
import {validationResult} from "express-validator";

import ProductSKUService from "../../../services/Product/ProductSKUService.js";

export default {


    async getProductSKUs(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try{
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({message: "Validation failed.", errors: errors.array()});

            const {productID} = req.params;
            const data = req.body;
            const skus = await ProductSKUService.find({product: productID});
            return res.status(200).json({ data: skus });
        } catch (error) {
            if (!isHttpError(error)) res.status(500);
            next(error);
        }
    },

    async createProductSKU(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try{
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({message: "Validation failed.", errors: errors.array()});

            const {productID} = req.params;
            const data = req.body;
            const sku = await ProductSKUService.create(productID, data);
            return res.status(200).json({ message: "Product SKU created successfully.", data: sku });
        } catch (error) {
            if (!isHttpError(error)) res.status(500);
            next(error);
        }
    },

    async updateProductSKU(req: Request, res: Response, next: NextFunction) {
        try{
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({message: "Validation failed.", errors: errors.array()});

            const {skuID} = req.params;
            const data = req.body;

            const sku = await ProductSKUService.update(skuID, data);

            return res.status(200).json({ message: "Product SKU updated successfully.", data: sku });
        } catch (error) {
            if (!isHttpError(error)) res.status(500);
            next(error);
        }
    },

    async destroy(req: Request, res: Response, next: NextFunction) {
        try{
            const {skuID} = req.params;
            await ProductSKUService.delete(skuID);
            return res.status(200).json({ message: "Product SKU deleted successfully." });
        } catch (error) {
            if (!isHttpError(error)) res.status(500);
            next(error);
        }
    },


};