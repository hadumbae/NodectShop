import mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { isHttpError } from 'http-errors';

import ProductAttributeOptionService from "../../../services/Product/ProductAttributeOptionService.js";

export default {
    async getAttributeOptions(req: Request, res: Response, next: NextFunction) {
        try {
            const {attributeID} = req.params;
            const options = await ProductAttributeOptionService.find({attribute: attributeID});
            return res.status(200).json({ message: "Attribute options fetched.", data: options });
        } catch (error) {
            if (!isHttpError(error)) res.status(500);
            next(error);
        }
    },

    async createAttributeOption(req: Request, res: Response, next: NextFunction)  {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ message: 'Validation failed.', errors: errors.array() });

            const { attributeID } = req.params;
            const { name } = req.body;

            const option = await ProductAttributeOptionService.create(name, attributeID);
            return res.status(200).json({ message: "Attribute option created successfully.", data: option });
        } catch (error) {
            if (!isHttpError(error)) res.status(500);
            next(error);
        }
    },

    async getAttributeOptionByID(req: Request, res: Response, next: NextFunction)  {
        try {
            const { optionID } = req.params;
            if (!mongoose.Types.ObjectId.isValid(optionID)) {
                return res.status(400).json({ message: 'Invalid ID.' });
            }

            const option = await ProductAttributeOptionService.existsOr404(optionID);
            return res.status(200).json({ message: "Attribute option retrieved.", data: option });
        } catch (error) {
            if (!isHttpError(error)) res.status(500);
            next(error);
        }
    },

    async updateAttributeOption(req: Request, res: Response, next: NextFunction)  {
        try {

            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ message: 'Validation failed.', errors: errors.array() });

            const { optionID } = req.params;
            const { name } = req.body;

            const option = await ProductAttributeOptionService.update(optionID, name);
            res.status(200).json({ message: 'Attribute option Updated.', data: option });
        } catch (error) {
            if (!isHttpError(error)) res.status(500);
            next(error);
        }
    },

    async deleteAttributeOption(req: Request, res: Response, next: NextFunction)  {
        try {
            const { optionID } = req.params;
            await ProductAttributeOptionService.delete(optionID);
            res.status(200).json({ message: 'Attribute option deleted.' });
        } catch (error) {
            if (!isHttpError(error)) res.status(500);
            next(error);
        }
    }
}
