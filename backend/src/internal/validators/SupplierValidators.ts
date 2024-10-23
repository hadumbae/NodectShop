import { body } from 'express-validator';
import SupplierService from '../../services/SupplierService.js';

export const addSupplierValidator = [
	body('name')
		.not()
		.isEmpty()
		.withMessage('Name must not be empty')
		.isLength({ min: 5 })
		.withMessage('Must be at least 5 characters long.')
		.custom(async (value, { req }) => {
			const checkCount = await SupplierService.countSuppliers({ name: value });

			if (checkCount > 0) {
				return Promise.reject('Name must be unique. Supplier with name already exists.');
			}
		}),
	body('website').not().isEmpty().withMessage('Website required.').isURL(),

	// Address
	body('address.street').not().isEmpty().withMessage('Address Street required.'),
	body('address.city').not().isEmpty().withMessage('Address City required.'),
	body('address.country').not().isEmpty().withMessage('Address Country required.'),
	body('address.postalCode').not().isEmpty().withMessage('Address Postal Code required.'),

	// Contact Persons
	body('contactPersons.*.name').not().isEmpty().withMessage("Contact person's name required."),
	body('contactPersons.*.title').not().isEmpty().withMessage("Contact person's title required."),
	body('contactPersons.*.email').not().isEmpty().withMessage("Contact person's email required.").normalizeEmail(),
	body('contactPersons.*.phone').not().isEmpty().withMessage("Contact person's phone required."),
];

export const addSupplierContactPersonValidator = [
	body('contactPersons.*.name').not().isEmpty().withMessage("Contact person's name required."),
	body('contactPersons.*.title').not().isEmpty().withMessage("Contact person's title required."),
	body('contactPersons.*.email').not().isEmpty().withMessage("Contact person's email required.").normalizeEmail(),
	body('contactPersons.*.phone').not().isEmpty().withMessage("Contact person's phone required."),
];
