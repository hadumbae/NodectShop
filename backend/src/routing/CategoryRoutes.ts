import express from 'express';

import { getCategories, getCategoryByID, createCategory, updateCategory, deleteCategory } from '../controllers/CategoryController.js';
import { addCategoryValidator } from '../validators/CategoryValidators.js';

const CategoryRoutes = express.Router();

// CRUD
CategoryRoutes.get('/', getCategories);
CategoryRoutes.post('/', addCategoryValidator, createCategory);
CategoryRoutes.get('/:id', getCategoryByID);
CategoryRoutes.patch('/:id', updateCategory);
CategoryRoutes.delete('/:id', deleteCategory);

export default CategoryRoutes;
