import { body } from 'express-validator';
import UserService from '../../services/User/UserService.js';

export default [
	body('email')
		.exists().withMessage('Email is required')
		.isEmail().withMessage('Email must be a valid email.')
		.normalizeEmail(),
	body('password')
		.exists().withMessage('Password required.')
		.isString().withMessage('Password must be a string.')
];
