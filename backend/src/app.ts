import 'dotenv/config';

import express, { Express, Request, Response, NextFunction } from 'express';
import { isHttpError } from 'http-errors';
import bodyParser from 'body-parser';

import connectDB from './internal/configs/connectDB.js';

import SupplierRoutes from './routing/SupplierRoutes.js';
import CategoryRoutes from './routing/CategoryRoutes.js';
import ProductRoutes from './routing/ProductRoutes.js';

const app: Express = express();

// Parses JSON Requests
app.use(bodyParser.json());

// Routing
app.use('/suppliers', SupplierRoutes);
app.use('/categories', CategoryRoutes);
app.use('/products', ProductRoutes);

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
