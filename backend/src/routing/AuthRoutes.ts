import express from 'express';

import { register, signin, updatePassword } from '../controllers/AuthController.js';
import { RegisterUserValidator, LoginUserValidator, AuthPasswordUpdateValidator } from '../internal/validators/UserValidators.js';

const AuthRoutes = express.Router();

AuthRoutes.post('/register', RegisterUserValidator, register);
AuthRoutes.post('/signin', LoginUserValidator, signin);
AuthRoutes.post('/update-password', AuthPasswordUpdateValidator, updatePassword);

export default AuthRoutes;
