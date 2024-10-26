import 'dotenv/config';

import express, { Express, Request, Response, NextFunction } from 'express';
import { isHttpError } from 'http-errors';
import bodyParser from 'body-parser';

import connectDB from './internal/configs/connectDB.js';

import AuthRoutes from './routing/AuthRoutes.js';
import UserRoutes from './routing/User/UserRoutes.js';

import SupplierRoutes from './routing/SupplierRoutes.js';
import CategoryRoutes from './routing/CategoryRoutes.js';
import ProductRoutes from './routing/ProductRoutes.js';
import UserCartRoutes from './routing/User/UserCartRoutes.js';

const app: Express = express();

// Parses JSON Requests
app.use(bodyParser.json());

// User Routing
app.use('/auth', AuthRoutes);
app.use('/user/cart', UserCartRoutes);

// Admin Routing
app.use('/admin/users', UserRoutes);
app.use('/admin/suppliers', SupplierRoutes);
app.use('/admin/categories', CategoryRoutes);
app.use('/admin/products', ProductRoutes);

// Express Error Handler
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
	console.error('[ERROR HANDLER] | ', error['message']);

	let errorMessage: string = 'Oops. Something bad happened!';
	let statusCode: number = 500;

	if (isHttpError(error)) {
		errorMessage = error.message;
		statusCode = error.status;
	}

	res.status(statusCode).json({ message: errorMessage });
});

connectDB()
	.then((result) => {
		app.listen(3000, () => {
			console.log('App is listening on PORT 3000...');
		});
	})
	.catch((err) => {
		err && console.error(err);
	});
