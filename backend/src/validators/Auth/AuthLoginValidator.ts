import { body } from 'express-validator';
import UserService from '../../services/User/UserService.js';

export default [
	body('email')
		.exists()
		.withMessage('Email is required')
		.isEmail()
		.withMessage('Email must be a valid email.')
		.custom(async (value, { req }) => {
			const user = await UserService.findOne({ email: value });

			if (!user) {
				return Promise.reject('User with email does not exists.');
			}
		})
		.normalizeEmail(),
	body('password')
		.exists()
		.withMessage('Password required.')
		.isString()
		.withMessage('Password must be a string.')
		.isLength({ min: 6 })
		.withMessage('Password must be at least six characters.'),
];
