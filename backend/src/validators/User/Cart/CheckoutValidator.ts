import { body } from "express-validator";
import {isBoolean} from "lodash";

const validateOrderNotes = body('orderNotes')
    .optional().isString().withMessage("Order notes must be strings.");

const validateShipToBillingAddress = body('shipToBillingAddress')
    .exists().withMessage('`Ship To Billing Address` is required.')
    .isBoolean().withMessage('`Ship To Billing Address` must be a boolean.');

const validateBillingAddress = [
    body('billingAddress.firstName')
        .exists().withMessage('Billing Address | First Name is required.')
        .isString().withMessage('Billing Address | First Name must be a string.'),
    body('billingAddress.lastName')
        .exists().withMessage('Billing Address | Last Name is required.')
        .isString().withMessage('Billing Address | Last Name must be a string.'),
    body('billingAddress.phoneNumber')
        .exists().withMessage('Billing Address | Phone Number is required.')
        .isString().withMessage('Billing Address | Phone Number must be a string.'),
    body('billingAddress.email')
        .exists().withMessage('Billing Address | Email is required.')
        .isEmail().withMessage('Billing Address | Email must be a valid email.'),
    body('billingAddress.country')
        .exists().withMessage('Billing Address | Country is required.')
        .isString().withMessage('Billing Address | Country must be a string.'),
    body('billingAddress.state')
        .exists().withMessage('Billing Address | State is required.')
        .isString().withMessage('Billing Address | State must be a string.'),
    body('billingAddress.street')
        .exists().withMessage('Billing Address | Street  is required.')
        .isString().withMessage('Billing Address | Street    must be a string.'),
    body('billingAddress.streetAdditional')
        .optional().isString().withMessage('Billing Address | streetAdditional must be a string.'),
];

const validateShippingAddress = [
    body('shippingAddress.firstName')
        .if(body('shipToBillingAddress').equals('false'))
        .exists().withMessage('Billing Address | First Name is required.')
        .isString().withMessage('Billing Address | First Name must be a string.'),
    body('shippingAddress.lastName')
        .if(body('shipToBillingAddress').equals('false'))
        .exists().withMessage('Billing Address | Last Name is required.')
        .isString().withMessage('Billing Address | Last Name must be a string.'),
    body('shippingAddress.phoneNumber')
        .if(body('shipToBillingAddress').equals('false'))
        .exists().withMessage('Billing Address | Phone Number is required.')
        .isString().withMessage('Billing Address | Phone Number must be a string.'),
    body('shippingAddress.email')
        .if(body('shipToBillingAddress').equals('false'))
        .exists().withMessage('Billing Address | Email is required.')
        .isEmail().withMessage('Billing Address | Email must be a valid email.'),
    body('shippingAddress.country')
        .if(body('shipToBillingAddress').equals('false'))
        .exists().withMessage('Billing Address | Country is required.')
        .isString().withMessage('Billing Address | Country must be a string.'),
    body('shippingAddress.state')
        .if(body('shipToBillingAddress').equals('false'))
        .exists().withMessage('Billing Address | State is required.')
        .isString().withMessage('Billing Address | State must be a string.'),
    body('shippingAddress.street')
        .if(body('shipToBillingAddress').equals('false'))
        .exists().withMessage('Billing Address | Street  is required.')
        .isString().withMessage('Billing Address | Street    must be a string.'),
    body('shippingAddress.streetAdditional')
        .optional().isString().withMessage('Billing Address | streetAdditional must be a string.'),
];

export default [
    validateOrderNotes,
    validateShipToBillingAddress,
    ...validateBillingAddress,
    ...validateShippingAddress,
];