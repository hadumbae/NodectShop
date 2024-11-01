import 'dotenv/config';

import express, { Express, Request, Response, NextFunction } from 'express';
import { isHttpError } from 'http-errors';
import bodyParser from 'body-parser';

import connectDB from './configs/connectDB.js';

import AuthRoutes from './routing/AuthRoutes.js';
import UserRoutes from './routing/Admin/User/UserRoutes.js';

import SupplierRoutes from './routing/Admin/SupplierRoutes.js';
import CategoryRoutes from './routing/Admin/CategoryRoutes.js';
import ProductRoutes from './routing/Admin/Product/ProductRoutes.js';
import ProductAttributeRoutes from "./routing/Admin/Product/ProductAttributeRoutes.js";
import UserProfileRoutes from "./routing/Client/User/UserProfileRoutes.js";

const app: Express = express();

// Parses JSON Requests
app.use(bodyParser.json());

// User Routing
app.use('/auth', AuthRoutes);
app.use('/user', UserProfileRoutes);

// Admin Routing
app.use('/admin/users', UserRoutes);
app.use('/admin/suppliers', SupplierRoutes);
app.use('/admin/categories', CategoryRoutes);
app.use('/admin/products', ProductRoutes);
app.use('/admin/attributes', ProductAttributeRoutes);

// Express Error Handler
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
	console.error('[ERROR HANDLER] | ', error['message']);

	let errorMessage: string = 'Oops. Something bad happened!';
	let statusCode: number = 500;

	if (isHttpError(error)) {
		errorMessage = error.message;
		statusCode = error.status;
	}

	return res.status(statusCode).json({ message: errorMessage });
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
