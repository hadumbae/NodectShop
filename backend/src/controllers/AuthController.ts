import { Request, Response, NextFunction } from 'express';
import createError, { isHttpError } from 'http-errors';
import { validationResult } from 'express-validator';

import AuthService from '../services/Auth/AuthService.js';

export const register = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ message: 'Validation failed.', errors: errors });
		}

		const data = req.body;
		await AuthService.register(data);

		return res.status(200).json({ message: 'User registered.' });
	} catch (error) {
		if (!isHttpError) {
			error = createError(error.status, error.message);
		}

		next(error);
	}
};

export const signin = async (req, res, next) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) return res.status(400).json({ message: 'Validation failed.', errors: errors.array() });

		const { email, password } = req.body;
		const token = await AuthService.signin(email, password);
		return res.json({ message: 'Login successful.', token: token });
	} catch (error) {
		if (!isHttpError) res.status(500);
		next(error);
	}
};

export const updatePassword = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) return res.status(400).json({ message: 'Validation failed.', errors: errors.array() });

		const { email, prevPassword, newPassword } = req.body;
		const user = await AuthService.changePassword(email, prevPassword, newPassword);

		return res.status(200).json({ message: 'Password Updated Successfully.' });
	} catch (error) {
		if (!isHttpError(error)) res.status(500);
		next(error);
	}
};
