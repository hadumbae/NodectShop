import { body } from 'express-validator';
import SupplierService from '../services/Supplier/SupplierService.js';
import SupplierRepository from "../repositories/SupplierRepository.js";

export const supplierValidator = [
	body('name')
		.exists().withMessage('Name must not be empty')
		.isLength({ min: 5 }).withMessage('Must be at least 5 characters long.')
		.custom(async (value, {req}) => {
			const supplier = await SupplierRepository.findOne({ name: value });
			if (supplier && supplier._id.toString() != req.params.supplierID) return Promise.reject('Name must be unique. Supplier with name already exists.');
		}),

	body('website')
		.exists().withMessage('Website required.')
		.isURL().withMessage("Website URL must be a valid URL."),

	body('contact.email')
		.optional({checkFalsy: true})
		.isEmail().withMessage('Contact Email must be a valid email.'),

	// Address
	body('address.street')
		.exists().withMessage('Street required.')
		.not().isEmpty().withMessage("Street required."),
	body('address.city')
		.exists().withMessage('City required.')
		.not().isEmpty().withMessage("City required."),
	body('address.state')
		.exists().withMessage('State required.')
		.not().isEmpty().withMessage("State required."),
	body('address.country')
		.exists().withMessage('Country required.')
		.not().isEmpty().withMessage("Country required."),
	body('address.postalCode')
		.exists().withMessage('Postal Code required.')
		.not().isEmpty().withMessage("Postal Code required."),

	// Contact Persons
	body('contactPersons.*.name').exists().withMessage("Contact person's name required."),
	body('contactPersons.*.title').exists().withMessage("Contact person's title required."),
	body('contactPersons.*.email').exists().withMessage("Contact person's email required.").normalizeEmail(),
	body('contactPersons.*.phone').exists().withMessage("Contact person's phone required."),
];

export const addSupplierContactPersonValidator = [
	body('contactPersons.*.name').exists().withMessage("Contact person's name required."),
	body('contactPersons.*.title').exists().withMessage("Contact person's title required."),
	body('contactPersons.*.email').exists().withMessage("Contact person's email required.").normalizeEmail(),
	body('contactPersons.*.phone').exists().withMessage("Contact person's phone required."),
];
