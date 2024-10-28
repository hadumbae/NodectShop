import express from 'express';

import isAuth from '../../middleware/isAuth.js';
import { getUsers, getUserByID, createUser, updateUser, deleteUser } from '../../controllers/Users/UserController.js';

import { CreateUserValidator, UpdateUserValidator } from '../../validators/UserValidators.js';

const UserRoutes = express.Router();

// Admin - CRUD
UserRoutes.get('/', isAuth, getUsers);
UserRoutes.post('/', [isAuth, ...CreateUserValidator], createUser);
UserRoutes.get('/:id', getUserByID);
UserRoutes.patch('/:id', [isAuth, ...UpdateUserValidator], updateUser);
UserRoutes.delete('/:id', isAuth, deleteUser);

export default UserRoutes;
