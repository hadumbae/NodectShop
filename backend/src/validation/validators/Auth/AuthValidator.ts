import {check} from "express-validator";
import createError from "http-errors";
import {Types} from "mongoose";

export default [
    check('userID').custom((value) => {
        if (!value) throw createError(400, 'User ID required. Please sign in');
        if (!Types.ObjectId.isValid(value)) throw createError(400, 'User ID Format Is Invalid.');
    }),
]