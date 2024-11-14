import {body} from "express-validator";
import createError from "http-errors";
import {Types} from "mongoose";
import UserRepository from "../../../../repositories/UserRepository.js";
import {isLength, isString} from "lodash";

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
];