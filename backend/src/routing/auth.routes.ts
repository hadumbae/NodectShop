import express from 'express';

import { register, signin, updatePassword } from '../controllers/AuthController.js';
import { RegisterUserValidator, AuthPasswordUpdateValidator } from '../validation/validators/User/UserValidators.js';

// Validator
import AuthLoginValidator from '../validation/validators/Auth/AuthLoginValidator.js';
import validateErrors from "../middleware/validateErrors.js";

const AuthRoutes = express.Router();

AuthRoutes.post('/register', RegisterUserValidator, register);
AuthRoutes.post('/signin', [...AuthLoginValidator, validateErrors], signin);
AuthRoutes.post('/update-password', AuthPasswordUpdateValidator, updatePassword);

export default AuthRoutes;
