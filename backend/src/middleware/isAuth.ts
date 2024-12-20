import {Request, Response, NextFunction} from "express";
import jwt from 'jsonwebtoken';
import createError from 'http-errors';

export default (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.get('Authorization');

	if (!authHeader) {
		req.isAuth = false;
		return next(createError(401, 'Unauthorized.'));
	}

	const token = authHeader.split(' ')[1];
	let decodedToken;

	try {
		decodedToken = jwt.verify(token, 'somesupersecretsecret');
	} catch (error) {
		req.isAuth = false;
		return next(createError(401, 'Unauthorized.'));
	}

	if (!decodedToken) {
		req.isAuth = false;
		return next(createError(401, 'Unauthorized.'));
	}

	req.userID = decodedToken.userID;
	req.userName = decodedToken.name;
	req.userEmail = decodedToken.email;
	req.isAdmin = decodedToken.isAdmin;

	req.isAuth = true;
	return next();
};
