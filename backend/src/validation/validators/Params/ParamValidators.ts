import { param } from "express-validator";
import createError from "http-errors";
import {Types} from "mongoose";

export const categoryIDParamValidator = param("categoryID")
    .isString().withMessage("Category ID Must Be A String.")
    .custom((value) => {
        console.log(value);

        if (!Types.ObjectId.isValid(value)) throw createError(400, "Invalid ID Format.");
        return true;
    });

