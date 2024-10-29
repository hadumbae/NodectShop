import {body} from "express-validator";
import {Types} from "mongoose";
import ProductSKUService from "../../services/Product/ProductSKUService.js";
import ProductAttributeOptionService from "../../services/Product/ProductAttributeOptionService.js";

export default [
  body('skuID')
      .exists().withMessage('Required.')
      .custom(async (value, {req}) => {
          if (!Types.ObjectId.isValid(value)) return Promise.reject("Invalid ID Format.");
          const sku = await ProductSKUService.findOne({_id: value});
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