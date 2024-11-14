import {body} from "express-validator";
import ProductAttributeService from "../../../../services/Attributes/product.attribute.admin.service.js";
import {Types} from "mongoose";
import createError from "http-errors";
import ProductAttributeOptionService from "../../../../services/Attributes/product.attribute.option.admin.service.js";

export default [
    body('name')
        .exists().withMessage('Name is required.')
        .isString().withMessage('Name must be a string.')
        .isLength({min: 3}).withMessage('Name must be at least 3 characters.')
        .custom(
            async (value, {req}) => {
                const option = await ProductAttributeOptionService.findOne({name: value, attribute: req.params.attributeID});
                if (option) return Promise.reject("Option with the same name and attribute already exists");
            }
        )
];