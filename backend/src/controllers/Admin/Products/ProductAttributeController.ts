import mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { isHttpError } from 'http-errors';

import ProductAttributeService from "../../../services/Product/ProductAttributeService.js";

export default {
    async getAttributes(req: Request, res: Response, next: NextFunction) {
        try {
            const attributes = await ProductAttributeService.find();
            return res.status(200).json({ message: "Product attributes fetched.", data: attributes });
        } catch (error) {
            if (!isHttpError(error)) res.status(500);
            next(error);
        }
    },

    async createAttribute(req: Request, res: Response, next: NextFunction)  {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ message: 'Validation failed.', errors: errors.array() });

            const data = req.body;
            const attribute = await ProductAttributeService.create(data);
            return res.status(200).json({ message: "Product attribute created successfully.", data: attribute });
        } catch (error) {
            if (!isHttpError(error)) res.status(500);
            next(error);
        }
    },

    async getAttributeByID(req: Request, res: Response, next: NextFunction)  {
        try {
            const { attributeID } = req.params;
            if (!mongoose.Types.ObjectId.isValid(attributeID)) {
                return res.status(400).json({ message: 'Invalid ID.' });
            }

            const attribute = await ProductAttributeService.existsOr404(attributeID);
            return res.status(200).json({ message: "Product attribute retrieved.", data: attribute });
        } catch (error) {
            if (!isHttpError(error)) res.status(500);
            next(error);
        }
    },

    async updateAttribute(req: Request, res: Response, next: NextFunction)  {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ message: 'Validation failed.', errors: errors.array() });

            const { attributeID } = req.params;
            const data = req.body;

            const attribute = await ProductAttributeService.update(attributeID, data);
            res.status(200).json({ message: 'Product attribute updated.', data: attribute });
        } catch (error) {
            if (!isHttpError(error)) res.status(500);
            next(error);
        }
    },

    async deleteAttribute(req: Request, res: Response, next: NextFunction)  {
        try {
            const { attributeID } = req.params;

            await ProductAttributeService.destroy(attributeID);
            res.status(200).json({ message: 'Product attribute deleted.' });
        } catch (error) {
            if (!isHttpError(error)) res.status(500);
            next(error);
        }
    }
}
