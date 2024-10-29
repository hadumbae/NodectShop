import createHttpError, { isHttpError } from 'http-errors';
import { validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import UserService from '../../services/User/UserService.js';

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const users = await UserService.find();
		return res.status(200).json({ data: users });
	} catch (error) {
		if (!isHttpError(error)) res.status(500);
		next(error);
	}
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		res.status(400).json({ message: 'Validation failed.', errors: errors.array() });
	}

	try {
		const data = req.body;
		const user = await UserService.create(data);

		return res.status(200).json({ data: user });
	} catch (error) {
		if (!isHttpError(error)) res.status(500);
		next(error);
	}
};

export const getUserByID = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const userID = req.params.id;
		const user = await UserService.existsOr404({ _id: userID });

		return res.status(200).json({ data: user });
	} catch (error) {
		if (!isHttpError(error)) res.status(500);
		next(error);
	}
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ message: 'Validation failed.', errors: errors.array() });
		}

		const userID = req.params.id;
		const data = req.body;

		await UserService.update(userID, data);
		res.status(200).json({ message: 'User Updated.' });
	} catch (error) {
		if (!isHttpError(error)) res.status(500);
		next(error);
	}
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const userID = req.params.id;
		await UserService.destroy(userID);

		res.status(200).json({ message: 'User Deleted.' });
	} catch (error) {
		if (!isHttpError(error)) res.status(500);
		next(error);
	}
};
