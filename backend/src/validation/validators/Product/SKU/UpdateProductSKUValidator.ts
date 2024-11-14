import {check, body} from "express-validator";
import {Types} from "mongoose";

import ProductAdminService from "../../../../services/Product/product.admin.service.js";
import SupplierAdminService from "../../../../services/Supplier/supplier.admin.service.js";
import ProductSKUService from "../../../../services/SKU/product.sku.admin.service.js";
import createError from "http-errors";
import SupplierRepository from "../../../../repositories/SupplierRepository.js";
import ProductSKURepository from "../../../../repositories/ProductSKURepository.js";

export default [
    body('supplier')
        .exists().withMessage("Supplier ID is required")
        .not().isEmpty().withMessage("Supplier ID is required.")
        .isString().withMessage("Supplier ID must be a string.")
        .custom(async (value) => {
            if(! Types.ObjectId.isValid(value)) {
                return Promise.reject("Supplier ID is not a valid ID.")
            }

            const supplier = await SupplierRepository.findById(value);
            if (!supplier) {
                return Promise.reject('Supplier not found.');
            }
        }),
    body('code')
        .exists().withMessage("Code is required.")
        .notEmpty().withMessage("Code is required.")
        .custom(async (value, {req}) => {
            const {skuID} = req.params;
            const sku = await ProductSKURepository.findOne({code: value});

            console.log("New SKU : ", skuID);
            console.log("Old SKU : ", sku._id.toString());

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