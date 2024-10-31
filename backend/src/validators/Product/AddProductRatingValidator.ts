import {body} from "express-validator";
import createError from "http-errors";
import {Types} from "mongoose";
import UserRepository from "../../repositories/UserRepository.js";
import {isLength, isString} from "lodash";
import ProductSKURepository from "../../repositories/ProductSKURepository.js";
import ProductRepository from "../../repositories/ProductRepository.js";

export default [
    body('review')
        .optional()
        .isString().withMessage("Review must be a string.")
        .isLength({max: 1500}).withMessage("Reviews must be no longer than 1500 characters."),

    body('rating')
        .exists().withMessage('rating is required.')
        .isNumeric().withMessage('Rating must be a number.')
        .custom(value => {
            if (value < 1 || value > 5) throw createError(400, "Rating must be between 1 and 5, inclusive.");
            return true;
        }),
    body('product')
        .exists().withMessage('Product ID is required.')
        .custom(async (value) => {
            if(!Types.ObjectId.isValid(value)) return Promise.reject('Invalid Product ID Format.');
            const product = ProductRepository.findByIdLean(value);
            if(!product) return Promise.reject("Product Not Found.");
        }),
    body('sku')
        .exists().withMessage('SKU ID is required.')
        .custom(async (value) => {
            if(!Types.ObjectId.isValid(value)) return Promise.reject('Invalid SKU ID Format.');
            const sku = ProductSKURepository.findByIdLean(value);
            if(!sku) return Promise.reject("Product SKU Not Found.");
        }),
];