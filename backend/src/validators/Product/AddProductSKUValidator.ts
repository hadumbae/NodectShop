import {check, body} from "express-validator";
import {Types} from "mongoose";

import ProductService from "../../services/ProductService.js";
import SupplierService from "../../services/Supplier/SupplierService.js";
import ProductSKUService from "../../services/Product/ProductSKUService.js";
import createError from "http-errors";

export default [
    body('supplier')
        .exists().withMessage("Supplier ID is required")
        .not().isEmpty().withMessage("Supplier ID is required.")
        .isLength({min: 1}).withMessage("Supplier ID is required.")
        .isString().withMessage("Supplier ID must be a string.")
        .custom(async (value) => {
            if(! Types.ObjectId.isValid(value)) {
                return Promise.reject("Supplier ID is not a valid ID.")
            }

            const supplier = await SupplierService.findByID(value);
            if (!supplier) {
                return Promise.reject('Supplier not found.');
            }
        }),
    body('code')
        .exists().withMessage("Code is required.")
        .notEmpty().withMessage("Code is required.")
        .trim()
        .custom(async (value) => {
            const sku = await ProductSKUService.findOne({code: value});

            if (sku) {
                return Promise.reject('Product SKU code must be unique.');
            }
        }),
    body('unitPrice')
        .exists().withMessage("Unit price is required")
        .isNumeric().withMessage("Unit price must be numeric.")
        .custom((value) => {
            if (value <= 0) {
                throw createError(400, "Unit price must be greater than 0.")
            }

            return true;
        }),
    body('unitStock')
        .exists().withMessage("Unit stock is required")
        .isNumeric().withMessage("Unit stock must be numeric.")
        .custom((value) => {
            if (value <= 0) {
                throw createError(400, "Unit stock must be greater than 0.")
            }

            return true;
        }),
    body('reorderLevel')
        .exists().withMessage("Reorder Level is required")
        .isNumeric().withMessage("Reorder level must be numeric.")
        .custom((value) => {
            if (value <= 0) {
                throw createError(400, "Reorder level must be greater than 0.")
            }

            return true;
        })
];