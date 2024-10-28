import {body} from "express-validator";
import ProductAttributeService from "../../services/Product/ProductAttributeService.js";
import {Types} from "mongoose";
import createError from "http-errors";
import ProductAttributeOptionService from "../../services/Product/ProductAttributeOptionService.js";

export default [
    body('name')
        .exists().withMessage('Name is required.')
        .isString().withMessage('Name must be a string.')
        .isLength({min: 3}).withMessage('Name must be at least 3 characters.')
        .custom(
            async (value, {req}) => {
                const option = await ProductAttributeOptionService.findOne({name: value, attribute: req.attribute});
                if (option && option._id.toString() != req.params.optionID) return Promise.reject("Option with the same name and attribute already exists");
            }
        ),
    body('attribute')
        .exists().withMessage('Attribute is required.')
        .custom(async (value) => {
            if (!Types.ObjectId.isValid(value)) return Promise.reject(createError(400, 'Invalid Attribute ID.'));
            const attribute = await ProductAttributeService.findByID(value);
            if (!attribute) return Promise.reject('Attribute Not Found.');
        })
];