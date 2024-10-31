import {check, body} from "express-validator";
import {Types} from "mongoose";

import createError from "http-errors";

export default [
    body("skuID")
        .exists().withMessage("SKU ID is required")
        .custom((value) => {
            if(! Types.ObjectId.isValid(value)) throw createError('Invalid SKU ID Format.');
            return true;
        }),
    check('image')
        .custom(({req}) => {
            if (req.files.length <= 0) throw createError(400, "Image required.");

            const acceptedTypes = [
                'image/png',
                'image/jpg',
                'image/jpeg',
                'image/avif',
            ];

            req.files.forEach((file: any) => {
                if(!acceptedTypes.includes(file.mimetype)) {
                    throw createError(400, "Invalid File Type. Only png, jpg, jpeg, and avif files accepted.");
                }
            });

            return true;
        }),
];