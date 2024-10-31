import express from 'express';

import { register, signin, updatePassword } from '../controllers/AuthController.js';
import { RegisterUserValidator, AuthPasswordUpdateValidator } from '../validators/User/UserValidators.js';

// Validator
import AuthLoginValidator from '../validators/Auth/AuthLoginValidator.js';

const AuthRoutes = express.Router();

AuthRoutes.post('/register', RegisterUserValidator, register);
AuthRoutes.post('/signin', AuthLoginValidator, signin);
AuthRoutes.post('/update-password', AuthPasswordUpdateValidator, updatePassword);

export default AuthRoutes;
