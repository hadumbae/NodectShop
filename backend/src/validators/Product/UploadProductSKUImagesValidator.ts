import {check, body} from "express-validator";
import {Types} from "mongoose";

import ProductService from "../../services/ProductService.js";
import SupplierService from "../../services/Supplier/SupplierService.js";
import ProductSKUService from "../../services/Product/ProductSKUService.js";
import createError from "http-errors";

export default [
    check('image')
        .custom((value, {req}) => {
            // Express Validate Does Not Validate Files
            if (req.files.length <= 0) {
                throw createError(400, "Image required.")
            }

            const acceptedTypes = [
                'image/png',
                'image/jpg',
                'image/jpeg',
                'image/avif',
            ];

            for (const file of req.files) {
                if(!acceptedTypes.includes(file.mimetype)) {
                    throw createError(400, "Invalid File Type. Only png, jpg, jpeg, and avif files accepted.")
                }
            }

            return true;
        }),
];