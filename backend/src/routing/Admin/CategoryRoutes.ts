import express from 'express';

import { getCategories, getCategoryByID, createCategory, updateCategory, deleteCategory } from '../../controllers/Admin/CategoryController.js';
import { addCategoryValidator } from '../../validators/CategoryValidators.js';
import isAuthAdmin from "../../middleware/isAuthAdmin.js";

const CategoryRoutes = express.Router();

// CRUD
CategoryRoutes.get('/', isAuthAdmin, getCategories);
CategoryRoutes.post('/', [isAuthAdmin, ...addCategoryValidator], createCategory);
CategoryRoutes.get('/:id', isAuthAdmin, getCategoryByID);
CategoryRoutes.patch('/:id', isAuthAdmin, updateCategory);
CategoryRoutes.delete('/:id', isAuthAdmin, deleteCategory);

export default CategoryRoutes;
