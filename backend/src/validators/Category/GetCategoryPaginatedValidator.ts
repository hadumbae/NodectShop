import { query } from "express-validator";
import createError from "http-errors";

export default [
    query("page")
        .optional()
        .isNumeric().withMessage("Page Must Be Numeric.")
        .custom((value) => {
            if (value < 1) throw createError(400, "Page Must Be Larger Than 0.")
            return true;
        }),
    query("perPage")
        .optional()
        .isNumeric().withMessage("PerPage Must Be Numeric.")
        .custom((value) => {
            if (value < 1) throw createError(400, "PerPage Must Be Larger Than 0.")
            return true;
        }),
];