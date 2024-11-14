import {body} from "express-validator";
import ProductAttributeService from "../../../../services/Attributes/product.attribute.admin.service.js";
import createError from "http-errors";
import ProductAttributeRepository from "../../../../repositories/ProductAttributeRepository.js";

export default [body('name')
    .exists().withMessage('Name is required.')
    .isString().withMessage('Name must be a string.')
    .isLength({min: 3}).withMessage('Name must be at least 3 characters.')
    .custom(async (value, {req}) => {
        const attribute = await ProductAttributeRepository.findOne({name: value});

        if (attribute && attribute._id.toString() != req.params.attributeID) {
            return Promise.reject("Attribute with name already exists.");
        }
    })];