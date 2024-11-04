import {body} from "express-validator";
import ProductAttributeRepository from "../../../repositories/ProductAttributeRepository.js";

export default [body('name')
    .exists().withMessage('Name is required.')
    .isString().withMessage('Name must be a string.')
    .isLength({min: 3}).withMessage('Name must be at least 3 characters.')
    .custom(
        async (value) => {
            const attribute = await ProductAttributeRepository.findOne({name: value});
            if (attribute) return Promise.reject("Attribute already exists");
        }
    )];