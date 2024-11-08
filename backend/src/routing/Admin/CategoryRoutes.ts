import express from 'express';

import { getCategories, getPaginatedCategories, getCategoryByID, createCategory, updateCategory, deleteCategory, buildCategories } from '../../controllers/Admin/CategoryController.js';
import { addCategoryValidator } from '../../validators/CategoryValidators.js';
import isAuthAdmin from "../../middleware/isAuthAdmin.js";
import GetPaginatedValidator from "../../validators/GetPaginatedValidator.js";

const CategoryRoutes = express.Router();

// CRUD
CategoryRoutes.get('/', isAuthAdmin, getCategories);
CategoryRoutes.post('/', [isAuthAdmin, ...addCategoryValidator], createCategory);

CategoryRoutes.get('/category/:id', isAuthAdmin, getCategoryByID);
CategoryRoutes.patch('/category/:id', isAuthAdmin, updateCategory);
CategoryRoutes.delete('/category/:id', isAuthAdmin, deleteCategory);
CategoryRoutes.get('/category/:id/data', isAuthAdmin, getCategoryByID);

CategoryRoutes.get('/paginated', [isAuthAdmin, ...GetPaginatedValidator], getPaginatedCategories);
CategoryRoutes.get('/build', buildCategories);


export default CategoryRoutes;
