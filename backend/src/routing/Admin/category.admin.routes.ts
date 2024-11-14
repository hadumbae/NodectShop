import express from 'express';

import isAuthAdmin from "../../middleware/isAuthAdmin.js";
import GetPaginatedValidator from "../../validation/validators/GetPaginatedValidator.js";
import validateErrors from "../../middleware/validateErrors.js";

import { getCategories, getPaginatedCategories, getCategoryByID, createCategory, updateCategory, deleteCategory, getCategoryData } from '../../controllers/Admin/Categories/CategoryController.js';
import {addCategoryValidator, updateCategoryValidator} from '../../validation/validators/CategoryValidators.js';


const CategoryAdminRoutes = express.Router();

// All

CategoryAdminRoutes.get('/get-all', isAuthAdmin, getCategories);
CategoryAdminRoutes.get('/get-paginated', [isAuthAdmin, ...GetPaginatedValidator, validateErrors], getPaginatedCategories);

// Data

CategoryAdminRoutes.get('/get/:categoryID', isAuthAdmin, getCategoryByID);
CategoryAdminRoutes.get('/get/:categoryID/data', isAuthAdmin, getCategoryData);

// Create, Update, Delete
CategoryAdminRoutes.post('/create', [isAuthAdmin, ...addCategoryValidator, validateErrors], createCategory);
CategoryAdminRoutes.patch('/update/:categoryID', [isAuthAdmin, ...updateCategoryValidator, validateErrors], updateCategory);
CategoryAdminRoutes.delete('/delete/:categoryID', isAuthAdmin, deleteCategory);

export default CategoryAdminRoutes;
