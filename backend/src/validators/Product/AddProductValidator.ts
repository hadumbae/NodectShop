import { body } from 'express-validator';
import Category from "../../models/Category.js";
import createError from "http-errors";

import ProductService from "../../services/ProductService.js";

export default [
    body('title')
        .notEmpty().withMessage('Title is required.')
        .isString().withMessage('Title must be a string.')
        .isLength({ min: 3 }).withMessage('Product title must be at least 3 letters long.')
        .custom(async (value) => {
            const product = await ProductService.findOne({title: value});

            if (product) {
                return Promise.reject("Product title must be unique. Please try again.");
            }
        }),
    body('description')
        .notEmpty().withMessage('Description is required.')
        .isString().withMessage('Description must be a string.')
        .isLength({ min: 10 }).withMessage('Description must be at least ten letters long.'),
    body('category')
        .exists().withMessage('Category is required.')
        .custom(async (value) => {
            const category = await Category.findById(value);

            if (!category) {
                throw createError(400, 'Category provided is not a valid ID');
            }

            return true;
        }),

];