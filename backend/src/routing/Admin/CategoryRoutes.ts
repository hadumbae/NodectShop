import express from 'express';

import { getCategories, getPaginatedCategories, getCategoryByID, createCategory, updateCategory, deleteCategory } from '../../controllers/Admin/CategoryController.js';
import { addCategoryValidator } from '../../validators/CategoryValidators.js';
import isAuthAdmin from "../../middleware/isAuthAdmin.js";
import GetPaginatedValidator from "../../validators/GetPaginatedValidator.js";
import validateErrors from "../../middleware/validateErrors.js";

const CategoryRoutes = express.Router();

CategoryRoutes.get('/', isAuthAdmin, getCategories);
CategoryRoutes.post('/', [isAuthAdmin, ...addCategoryValidator, validateErrors], createCategory);

CategoryRoutes.get('/category/:id', isAuthAdmin, getCategoryByID);
CategoryRoutes.patch('/category/:id', [isAuthAdmin, ...addCategoryValidator, validateErrors], updateCategory);
CategoryRoutes.delete('/category/:id', isAuthAdmin, deleteCategory);
CategoryRoutes.get('/category/:id/data', isAuthAdmin, getCategoryByID);

CategoryRoutes.get('/paginated', [isAuthAdmin, ...GetPaginatedValidator, validateErrors], getPaginatedCategories);


export default CategoryRoutes;
