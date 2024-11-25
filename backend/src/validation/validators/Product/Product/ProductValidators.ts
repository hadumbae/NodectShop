import {body, check} from 'express-validator';
import Category from "../../../../models/category.schema.js";
import createError from "http-errors";

import ProductRepository from "../../../../repositories/ProductRepository.js";

const validate = [
    body('title')
        .notEmpty().withMessage('Title is required.')
        .isString().withMessage('Title must be a string.')
        .isLength({ min: 3 }).withMessage('Product title must be at least 3 letters long.')
        .custom(async (value, {req}) => {
            const { productID } = req.params;

            const product = await ProductRepository.findOne({title: value, _id: {$ne: productID}});

            if (product) {
                return Promise.reject("Product title must be unique. Please try again.");
            }
        }),

    body('types')
        .isArray().withMessage('Types must be an array.'),

    body('types.*')
        .isString().withMessage('Types must be strings.'),

    body('description')
        .notEmpty().withMessage('Description is required.')
        .isString().withMessage('Description must be a string.')
        .isLength({ min: 10 }).withMessage('Description must be at least ten letters long.'),

    body('tags')
        .isArray().withMessage('Tags must be an array.'),

    body('tags.*')
        .isString().withMessage('Tags must be strings.'),

    body('category')
        .optional({checkFalsy: true, nullable: true})
        .isString().withMessage('Invalid Category.')
        .isLength({min: 1}).withMessage("Category cannot be empty string.")
        .custom(async (value) => {
            const category = await Category.findById(value);
            if (!category) return Promise.reject('Category Not Found.');
        }),
];

export const addProductValidator = [
    ...validate,
    check('file')
        .custom((value, {req}) => {
            if (!req.file) throw createError(400, "Image required.");

            const acceptedTypes = [
                'image/png',
                'image/jpg',
                'image/jpeg',
            ];

            if(!acceptedTypes.includes(req.file.mimetype)) {
                throw createError(400, "Invalid File Type. Only png, jpg, and jpeg files accepted.");
            }

            return true;
        }),
]

export const updateProductValidator = [
    ...validate,
    check('image')
        .custom((value, {req}) => {
            if (!req.file) return true;

            const acceptedTypes = [
                'image/png',
                'image/jpg',
                'image/jpeg',
            ];

            if(!acceptedTypes.includes(req.file.mimetype)) {
                throw createError(400, "Invalid File Type. Only png, jpg, and jpeg files accepted.");
            }

            return true;
        }),
]