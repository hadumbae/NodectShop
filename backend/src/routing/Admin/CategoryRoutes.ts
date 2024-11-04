import express from 'express';

import { getCategories, getCategoryByID, createCategory, updateCategory, deleteCategory, buildCategories } from '../../controllers/Admin/CategoryController.js';
import { addCategoryValidator } from '../../validators/CategoryValidators.js';
import isAuthAdmin from "../../middleware/isAuthAdmin.js";
import GetPaginatedValidator from "../../validators/GetPaginatedValidator.js";

const CategoryRoutes = express.Router();

// CRUD
CategoryRoutes.get('/', [isAuthAdmin, ...GetPaginatedValidator], getCategories);
CategoryRoutes.post('/', [isAuthAdmin, ...addCategoryValidator], createCategory);
CategoryRoutes.get('/:id', isAuthAdmin, getCategoryByID);
CategoryRoutes.patch('/:id', isAuthAdmin, updateCategory);
CategoryRoutes.delete('/:id', isAuthAdmin, deleteCategory);

CategoryRoutes.get('/:id/data', isAuthAdmin, getCategoryByID);
CategoryRoutes.get('/build', buildCategories);

export default CategoryRoutes;
