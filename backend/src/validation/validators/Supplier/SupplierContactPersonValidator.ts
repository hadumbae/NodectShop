import {body} from 'express-validator';

export default [
    body('name')
        .exists().withMessage("Name is required")
        .not().isEmpty().withMessage("Name is required."),
    body('title')
        .exists().withMessage("Title is required")
        .not().isEmpty().withMessage("Title is required."),
    body('email')
        .exists().withMessage("Email is required")
        .not().isEmpty().withMessage("Email is required.")
        .normalizeEmail(),
    body('phone')
        .exists().withMessage("Phone is required")
        .not().isEmpty().withMessage("Phone is required."),
]