import express from 'express';

import isAuthAdmin from "../../middleware/isAuthAdmin.js";
import GetPaginatedValidator from "../../validation/validators/GetPaginatedValidator.js";
import validateErrors from "../../middleware/validateErrors.js";

import {addCategoryValidator, updateCategoryValidator} from '../../validation/validators/CategoryValidators.js';
import isAuth from "../../middleware/isAuth.js";
import getPaginatedValidator from "../../validation/validators/GetPaginatedValidator.js";
import {categoryIDParamValidator} from "../../validation/validators/Params/ParamValidators.js";

import {
    getCategories,
    getPaginatedCategories,
    getPaginatedProductsByCategory,
    getCategoryByID,
    createCategory,
    updateCategory,
    deleteCategory
} from '../../controllers/Admin/Categories/CategoryController.js';

const CategoryAdminRoutes = express.Router();

CategoryAdminRoutes.get('/all', isAuthAdmin, getCategories);

CategoryAdminRoutes.get('/paginated/all', [isAuthAdmin, ...GetPaginatedValidator, validateErrors], getPaginatedCategories);
CategoryAdminRoutes.get('/paginated/by-category/:categoryID/products', [isAuth, ...getPaginatedValidator, categoryIDParamValidator], getPaginatedProductsByCategory);

CategoryAdminRoutes.get('/get/:categoryID', isAuthAdmin, getCategoryByID);
CategoryAdminRoutes.post('/create', [isAuthAdmin, ...addCategoryValidator, validateErrors], createCategory);
CategoryAdminRoutes.patch('/update/:categoryID', [isAuthAdmin, ...updateCategoryValidator, validateErrors], updateCategory);
CategoryAdminRoutes.delete('/delete/:categoryID', isAuthAdmin, deleteCategory);

export default CategoryAdminRoutes;
