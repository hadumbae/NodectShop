import {body} from "express-validator";
import ProductAttributeService from "../../services/Product/ProductAttributeService.js";
import createError from "http-errors";

export default body('name')
    .exists().withMessage('Name is required.')
    .isString().withMessage('Name must be a string.')
    .isLength({min: 3}).withMessage('Name must be at least 3 characters.')
    .custom(
        async (value) => {
            const attribute = await ProductAttributeService.findOne({name: value});
            if (attribute) return Promise.reject("Attribute already exists");
        }
    );