import { check, body } from 'express-validator';
import ProductService from '../../services/ProductService.js';
import createError from 'http-errors';
import Supplier from '../models/Supplier.js';
import Category from '../models/Category.js';

const validateTitle = body('title')
	.notEmpty()
	.withMessage('Title is required.')
	.isString()
	.withMessage('Title must be a string.')
	.isLength({ min: 3 })
	.withMessage('Product title must be at least 3 letters long.');

const validateBarcode = body('barcodeNumber')
	.notEmpty()
	.withMessage('UPC/EAN number is required.')
	.isString()
	.withMessage('UPC/EAN number must be a string.')
	.isLength({ min: 12, max: 15 })
	.withMessage('UPC/EAN number must be at 12-15 characters long.')
	.custom(async (value, { req }) => {
		const productID = req.params.productID;
		const product = await ProductService.findOne({ barcodeNumber: value });

		if (productID) {
			if (product && product._id.toString() != productID) {
				return Promise.reject('UPC/EAN number must be unique.');
			}
		} else {
			if (product) {
				return Promise.reject('UPC/EAN number must be unique.');
			}
		}
	});

const validateDescription = body('description')
	.notEmpty()
	.withMessage('Description is required.')
	.isString()
	.withMessage('Description must be a string.')
	.isLength({ min: 10 })
	.withMessage('Description must be at least ten letters long.');

const validateUnitPrice = body('unitPrice')
	.notEmpty()
	.withMessage('Title is required.')
	.isFloat()
	.withMessage('Unit price must be a float.')
	.custom((value) => {
		if (value <= 0) throw createError(400, 'Unit Price cannot be zero or less. Please be careful.');
		return true;
	});

const validateUnitStock = body('unitStock')
	.notEmpty()
	.withMessage('Unit Stock is required.')
	.isInt()
	.withMessage('Unit Stock must be an integer.')
	.custom((value) => {
		if (value < 0) throw createError(400, 'Unit stock may not be negative.');
		return true;
	});

const validateReorderLevel = body('reorderLevel')
	.notEmpty()
	.withMessage('Reorder Level is required.')
	.isInt()
	.withMessage('Reorder Level must be an integer.')
	.custom((value) => {
		if (value < 0) {
			throw createError(400, 'Unit stock may not be negative.');
		}

		return true;
	});

const validateIsDiscontinued = body('isDiscontinued').optional().isBoolean().withMessage('Discontinued status must be a boolean.');

const validateImages = body('images').isEmpty().withMessage('Please do not include main image links.');

const validateFile = check('file').custom((value, { req }) => {
	if (!req.file) {
		throw createError(400, 'Image is required.');
	}

	return true;
});

const validateSupplier = body('supplier')
	.notEmpty()
	.withMessage('Supplier required.')
	.custom(async (value) => {
		const supplier = await Supplier.findById(value);

		if (!supplier) {
			throw createError(400, 'Supplier provided is not a valid ID');
		}

		return true;
	});

const validateCategory = body('category')
	.optional()
	.custom(async (value) => {
		const category = await Category.findById(value);

		if (!category) {
			throw createError(400, 'Category provided is not a valid ID');
		}

		return true;
	});

// Exports

export const addProductValidator = [
	validateTitle,
	validateBarcode,
	validateDescription,
	validateUnitPrice,
	validateUnitStock,
	validateReorderLevel,
	validateIsDiscontinued,
	validateImages,
	validateFile,
	validateSupplier,
	validateCategory,
];

export const updateProductValidator = [
	validateTitle,
	validateBarcode,
	validateDescription,
	validateUnitPrice,
	validateUnitStock,
	validateReorderLevel,
	validateIsDiscontinued,
	validateImages,
	validateSupplier,
	validateCategory,
];
