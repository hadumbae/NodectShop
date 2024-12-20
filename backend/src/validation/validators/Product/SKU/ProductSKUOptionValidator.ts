import {body} from "express-validator";
import {Types} from "mongoose";
import ProductSKUService from "../../../../services/SKU/product.sku.admin.service.js";
import ProductAttributeOptionService from "../../../../services/Attributes/product.attribute.option.admin.service.js";
import ProductSKURepository from "../../../../repositories/ProductSKURepository.js";

export default [
  body('skuID')
      .exists().withMessage('Required.')
      .custom(async (value, {req}) => {
          if (!Types.ObjectId.isValid(value)) return Promise.reject("Invalid ID Format.");
          const sku = await ProductSKURepository.findOne({_id: value});
          if (!sku) return Promise.reject("SKU Not Found.");
      }),
  body('optionID')
      .exists().withMessage('Required.')
      .custom(async (value, {req}) => {
          if (!Types.ObjectId.isValid(value)) return Promise.reject("Invalid ID Format.");
          const option = await ProductAttributeOptionService.findOne({_id: value});
          if (!option) return Promise.reject("Option Not Found.");
      }),
];