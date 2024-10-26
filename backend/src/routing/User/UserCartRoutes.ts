import express from 'express';

// Middleware
import isAuth from '../../middleware/isAuth.js';
import CartItemValidator from '../../internal/validators/User/Cart/CartItemValidator.js';

// Controller
import UserCartController from '../../controllers/Users/UserCartController.js';

// * Router
const UserCartRoutes = express.Router();

// ? Get User Cart
UserCartRoutes.get('/:userID', isAuth, UserCartController.fetchUserCart);
// ? Get User Cart
UserCartRoutes.delete('/:userID', isAuth, UserCartController.clearUserCart);
// ? Add To User Cart
UserCartRoutes.post('/:userID/add', [isAuth, ...CartItemValidator], UserCartController.addToUserCart);
// ? Remove From User Cart
UserCartRoutes.post('/:userID/remove', [isAuth, ...CartItemValidator], UserCartController.removeFromUserCart);

export default UserCartRoutes;
