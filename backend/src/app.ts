import 'dotenv/config';

import express, { Express, Request, Response, NextFunction } from 'express';
import { isHttpError } from 'http-errors';
import bodyParser from 'body-parser';
import cors from "cors";

import connectDB from './configs/connectDB.js';

import AuthRoutes from './routing/auth.routes.js';
import UserAdminRoutes from './routing/Admin/User/user.admin.routes.js';

import SupplierAdminRoutes from './routing/Admin/supplier.admin.routes.js';
import CategoryAdminRoutes from './routing/Admin/category.admin.routes.js';
import ProductAdminRoutes from './routing/Admin/Product/product.admin.routes.js';
import ProductAttributeAdminRoutes from "./routing/Admin/Attributes/product.attribute.admin.routes.js";
import UserProfileRoutes from "./routing/Client/User/user.client.routes.js";
import ProductSkuAdminRoutes from "./routing/Admin/SKU/product.sku.admin.routes.js";

const app: Express = express();

// const corsOptions = {
// 	origin: 'http://localhost:8080',
// 	optionsSuccessStatus: 200,
// };

// Parses JSON Requests
app.use(bodyParser.json());
app.use(cors());

// User Routing
app.use('/auth', AuthRoutes);
app.use('/user', UserProfileRoutes);

// Admin Routing
app.use('/admin/users', UserAdminRoutes);
app.use('/admin/suppliers', SupplierAdminRoutes);
app.use('/admin/categories', CategoryAdminRoutes);
app.use('/admin/products', ProductAdminRoutes);
app.use('/admin/products', ProductSkuAdminRoutes);
app.use('/admin/attributes', ProductAttributeAdminRoutes);

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
		app.listen(8080, () => {
			console.log('App is listening on PORT 8080...');
		});
	})
	.catch((err) => {
		err && console.error(err);
	});
