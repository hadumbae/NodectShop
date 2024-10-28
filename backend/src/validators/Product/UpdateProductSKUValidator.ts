import {check, body} from "express-validator";
import {Types} from "mongoose";

import ProductService from "../../services/ProductService.js";
import SupplierService from "../../services/Supplier/SupplierService.js";
import ProductSKUService from "../../services/Product/ProductSKUService.js";
import createError from "http-errors";

export default [
    body('supplier')
        .exists().withMessage("supplier is required")
        .isString().withMessage("supplier ID must be a string.")
        .custom(async (value) => {
            if(! Types.ObjectId.isValid(value)) {
                return Promise.reject("Product ID is not a valid ID.")
            }

            const supplier = await SupplierService.findByID(value);
            if (!supplier) {
                return Promise.reject('Supplier not found.');
            }
        }),
    body('code')
        .exists().withMessage("Code is required")
        .notEmpty().withMessage("Code is required")
        .custom(async (value, {req}) => {
            const {skuID} = req.params;
            const sku = await ProductSKUService.findOne({code: value});

            if (sku && sku._id.toString() != skuID) {
                return Promise.reject('Product SKU code must be unique.');
            }
        }),
    body('unitPrice')
        .exists().withMessage("unitPrice is required")
        .isNumeric().withMessage("Unit stock must be numeric.")
        .custom((value) => {
            if (value <= 0) {
                throw createError(400, "Unit price must be greater than 0.")
            }

            return true;
        }),
    body('unitStock')
        .exists().withMessage("unitStock is required")
        .isNumeric().withMessage("Unit stock must be numeric.")
        .custom((value) => {
            if (value <= 0) {
                throw createError(400, "Unit price must be greater than 0.")
            }

            return true;
        }),
    body('reorderLevel')
        .exists().withMessage("reorderLevel is required")
        .isNumeric().withMessage("Reorder level must be numeric.")
        .custom((value) => {
            if (value <= 0) {
                throw createError(400, "Reorder level must be greater than 0.")
            }

            return true;
        }),
    body('isDiscontinued')
        .exists().withMessage("Discontinued status is required")
        .isBoolean().withMessage("Discontinued status must be a boolean."),
];