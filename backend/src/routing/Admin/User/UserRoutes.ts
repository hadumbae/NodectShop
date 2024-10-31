import express from 'express';

import isAuth from '../../../middleware/isAuth.js';
import { getUsers, getUserByID, createUser, updateUser, deleteUser } from '../../../controllers/Admin/Users/UserController.js';

import { CreateUserValidator, UpdateUserValidator } from '../../../validators/User/UserValidators.js';

const UserRoutes = express.Router();

// Admin - CRUD
UserRoutes.get('/user/', isAuth, getUsers);
UserRoutes.post('/user/', [isAuth, ...CreateUserValidator], createUser);
UserRoutes.get('/user/:id', isAuth, getUserByID);
UserRoutes.patch('/user/:id', [isAuth, ...UpdateUserValidator], updateUser);
UserRoutes.delete('/user/:id', isAuth, deleteUser);

export default UserRoutes;
