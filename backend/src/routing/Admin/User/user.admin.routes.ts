import express from 'express';

import isAuth from '../../../middleware/isAuth.js';
import { getUsers, getUserByID, createUser, updateUser, deleteUser } from '../../../controllers/Admin/Users/UserController.js';

import { CreateUserValidator, UpdateUserValidator } from '../../../validation/validators/User/UserValidators.js';

const UserAdminRoutes = express.Router();

// Admin - CRUD
UserAdminRoutes.get('/user/', isAuth, getUsers);
UserAdminRoutes.post('/user/', [isAuth, ...CreateUserValidator], createUser);
UserAdminRoutes.get('/user/:id', isAuth, getUserByID);
UserAdminRoutes.patch('/user/:id', [isAuth, ...UpdateUserValidator], updateUser);
UserAdminRoutes.delete('/user/:id', isAuth, deleteUser);

export default UserAdminRoutes;
