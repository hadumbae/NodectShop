import { body } from 'express-validator';
import UserService from '../../services/User/UserService.js';

// Name
const validateName = body('name')
	.exists()
	.withMessage('Name is required.')
	.isString()
	.withMessage('Name must be a string.')
	.isLength({ min: 1 })
	.withMessage('Name is required.');

// Email

const validateEmailExists = body('email').exists().withMessage('Email is required').isEmail().withMessage('Email must be a valid email.').normalizeEmail();

const validateEmail = body('email')
	.exists()
	.withMessage('Email is required')
	.isEmail()
	.withMessage('Email must be a valid email.')
	.custom(async (value, { req }) => {
		const user = await UserService.findOne({ email: value });

		if (user) {
			return Promise.reject('User with email already exists. Please try again.');
		}
	})
	.normalizeEmail();

// Is Admin
const validateIsAdmin = body('isAdmin').not().exists().withMessage('Do not include admin status in request.');

// Password
const generatePasswordValidators = (title) =>
	body(title)
		.exists()
		.withMessage('Password required.')
		.isString()
		.withMessage('Password must be a string.')
		.isLength({ min: 6 })
		.withMessage('Password must be at least six characters.');

const validateNoPassword = body('password').not().exists().withMessage('Please update password separately.');
const validatePassword = generatePasswordValidators('password');
const validatePrevPassword = generatePasswordValidators('prevPassword');
const validateNewPassword = generatePasswordValidators('newPassword');

// Validators

// Auth
export const RegisterUserValidator = [validateName, validateEmail, validatePassword, validateIsAdmin];
export const LoginUserValidator = [validateEmail, validatePassword];
export const AuthPasswordUpdateValidator = [validateEmailExists, validatePrevPassword, validateNewPassword];

// CRUD
export const CreateUserValidator = [validateName, validateEmail, validatePassword];
export const UpdateUserValidator = [validateName, validateEmail, validateNoPassword];
